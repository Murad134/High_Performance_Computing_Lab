const headerSanitizer = (req, res, next) => {
  delete req.headers['x-internal-secret'];
  next();
};

module.exports = headerSanitizer;