const admin = require("firebase-admin");

const verifyFBToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 1️⃣ Check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Unauthorized access" });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    try {
        // 3️⃣ Verify token using Firebase Admin
        const decoded = await admin.auth().verifyIdToken(token);

        // 4️⃣ Save decoded user info
        req.decoded = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).send({ message: "Unauthorized access" });
    }
};

module.exports = verifyFBToken;