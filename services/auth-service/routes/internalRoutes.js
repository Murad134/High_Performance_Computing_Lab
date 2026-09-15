const express = require("express");

const router = express.Router();

const internalAuth = require("../middleware/internalAuth");

const {
    verifyRoleInternal,
    verifyTokenAndGetRole,
} = require("../controllers/userController");

const { getCollection } = require("../config/db");

router.post(
    "/verify-role", 
    internalAuth, 
    verifyRoleInternal);
// GET /internal/verify-role?email=...
router.get(
    "/verify-role",
    internalAuth,
    verifyRoleInternal
);

// POST /internal/verify-token   body: { token }
router.post(
    "/verify-token",
    internalAuth,
    verifyTokenAndGetRole
);
// GET /internal/stats/users
router.get(
    "/stats/users",
    internalAuth,
    async (req, res) => {
        try {
            const users = getCollection("users");
            const totalUsers = await users.countDocuments();
            const totalAdmins = await users.countDocuments({
                role: "admin",
            });

            const latestUser = await users
                .findOne({}, {
                    sort: { updated_at: -1 },
                    projection: { updated_at: 1 },
                });

            res.json({
                totalUsers,
                totalAdmins,
                lastUpdated: latestUser?.updated_at || null,
            });

        } catch (err) {
            console.error("User stats error:", err);

            res.status(500).json({
                message: "Failed to fetch user stats",
            });
        }
    }
);
module.exports = router;