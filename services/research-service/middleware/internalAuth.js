const crypto = require("crypto");

const internalAuth = (req, res, next) => {
  const internalKey = req.headers["x-internal-secret"];
  const expectedKey = process.env.INTERNAL_SECRET;

  if (!expectedKey) {
    return res.status(500).json({
      success: false,
      message: "INTERNAL_SECRET is not configured",
    });
  }

  if (!internalKey) {
    return res.status(401).json({
      success: false,
      message: "INTERNAL_SECRET is required",
    });
  }

  const provided = Buffer.from(internalKey);
  const expected = Buffer.from(expectedKey);

  if (
    provided.length !== expected.length ||
    !crypto.timingSafeEqual(provided, expected)
  ) {
    return res.status(403).json({
      success: false,
      message: "Invalid internal secret",
    });
  }

  next();
};

module.exports = internalAuth;