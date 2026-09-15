const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");
const routeConfig = require("./routeConfig");

const setupProxy = (app) => {
  routeConfig.forEach(({ path, target, rewriteTo }) => {
    if (!target) {
      console.warn(
        `⚠️ No target URL set for route "${path}" — check your .env`
      );
      return;
    }

    app.use(
      path,
      createProxyMiddleware({
        target,
        changeOrigin: true,

        // Keep the original Gateway path
        pathRewrite: (proxyPath, req) => {
          const originalUrl = req.originalUrl;
          if (!rewriteTo) return originalUrl;

          return `${rewriteTo}${originalUrl.slice(path.length)}`;
        },

        on: {
          proxyReq: (proxyReq, req) => {
            const authorization =
              req.headers.authorization || req.headers.Authorization;

            if (authorization) {
              proxyReq.setHeader("Authorization", authorization);
            }

            console.log(
              `[${req.requestId || "no-id"}] Forwarding ${req.method} ${req.originalUrl} to ${target}${req.originalUrl}`,
              authorization ? "with Authorization" : "without Authorization"
            );

            if (req.requestId) {
              proxyReq.setHeader("X-Request-Id", req.requestId);
            }

            // express.json() consumes the request stream before the proxy sees it.
            // Rebuild the parsed body using the library's supported helper.
            fixRequestBody(proxyReq, req);
          },
        },

        onError: (err, req, res) => {
          console.error(
            `Proxy error for ${path}:`,
            err.message
          );

          if (!res.headersSent) {
            res.status(502).json({
              message: `${path} service is unavailable`,
              requestId: req.requestId || null,
            });
          }
        },
      })
    );
  });
};

module.exports = setupProxy;