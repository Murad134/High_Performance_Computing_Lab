const routeConfig = require('./routeConfig');

const authMiddleware = (req, res, next) => {
  const matchedRoute = routeConfig.find((r) => req.path.startsWith(r.path));

  if (!matchedRoute || !matchedRoute.requiresAuth) {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  next();
};

module.exports = authMiddleware;