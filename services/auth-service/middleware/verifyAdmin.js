// middlewares/verifyAdmin.js
const { getUserByEmail } = require("../models/userModel");

const verifyAdmin = async (req, res, next) => {
    try {
        const email = req.decoded?.email;

        if (!email) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const user = await getUserByEmail(email);

        if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
            return res.status(403).send({
                message: "Admin access required"
            });
        }

        req.user = user; // optional (use later)
        next();

    } catch (error) {
        console.error("verifyAdmin error:", error);
        res.status(500).send({ message: "Authorization failed" });
    }
};

module.exports = verifyAdmin;