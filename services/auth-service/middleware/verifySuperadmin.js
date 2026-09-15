// middlewares/verifySuperadmin.js
const { getUserByEmail } = require("../models/userModel");

const verifySuperadmin = async (req, res, next) => {
    try {
        const email = req.decoded?.email;

        if (!email) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const user = await getUserByEmail(email);

        if (!user || user.role !== "superadmin") {
            return res.status(403).send({
                message: "Superadmin access required"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("verifySuperadmin error:", error);
        res.status(500).send({ message: "Authorization failed" });
    }
};

module.exports = verifySuperadmin;