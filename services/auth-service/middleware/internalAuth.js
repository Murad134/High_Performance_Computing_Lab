const crypto = require("crypto");

const internalAuth = (req, res, next) => {
    const providedSecret = req.headers["x-internal-secret"];
    const expectedSecret = process.env.INTERNAL_SECRET;

    if (!providedSecret || !expectedSecret) {
        return res.status(401).json({
            message: "Unauthorized internal request",
        });
    }

    const providedBuffer = Buffer.from(providedSecret);
    const expectedBuffer = Buffer.from(expectedSecret);

    if (
        providedBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(
            providedBuffer,
            expectedBuffer
        )
    ) {
        return res.status(401).json({
            message: "Invalid internal secret",
        });
    }

    next();
};

module.exports = internalAuth;