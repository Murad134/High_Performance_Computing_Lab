const crypto = require("crypto");

const internalAuth = (req, res, next) => {
  try {
    const internalKey = req.headers["x-internal-secret"];
    const expectedKey = process.env.INTERNAL_SECRET;

    if (!expectedKey) {
      console.error("INTERNAL_SECRET is not configured");
      return res.status(500).json({
        success: false,
        message: "Internal authentication is not configured",
      });
    }

    if (!internalKey) {
      return res.status(401).json({
        success: false,
        message: "INTERNAL_SECRET is required",
      });
    }

    const providedBuffer = Buffer.from(internalKey);
    const expectedBuffer = Buffer.from(expectedKey);

    if (
      providedBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid internal secret",
      });
    }

    req.isInternalRequest = true;

    next();
  } catch (error) {
    console.error("Internal auth error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal authentication failed",
    });
  }
};

module.exports = internalAuth;