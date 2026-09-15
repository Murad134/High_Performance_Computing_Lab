

const { getAuth } = require("firebase-admin/auth");
require("../config/firebase");

const verifyFBToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("Token verification failed: Authorization Bearer header is missing");
        return res.status(401).json({
            message: "Firebase ID token is missing",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        console.error("Token verification failed: Bearer token is empty");
        return res.status(401).json({
            message: "Firebase ID token is missing",
        });
    }

    try {
        const decoded = await getAuth().verifyIdToken(token);

        req.decoded = decoded;

        next();
    } catch (error) {
        console.error("Token verification error:", error.message);

        return res.status(401).json({
            message: "Invalid Firebase ID token",
        });
    }
};

module.exports = verifyFBToken;