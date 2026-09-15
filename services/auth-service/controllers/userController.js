// controllers/userController.js
const { ObjectId } = require('mongodb'); // ✅ make sure imported
const { createUser, getAllUsers, getUserByEmail, getUserById, updateUserByEmail, searchUsersByEmail, updateUserRole } = require('../models/userModel');
const { getAuth } = require('firebase-admin/auth');
require('../config/firebase');

const SUPER_ADMIN_EMAIL = "murad25.cse@gmail.com";

// POST /users
async function addUser(req, res) {
    try {
        const email = req.decoded?.email || req.body.email;
        const {
            role,
            created_at,
            last_log_in,
            displayName,
            photoURL,
        } = req.body;

        if (!email) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Check if user exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            const profileUpdate = {};
            if (displayName || req.decoded?.name) {
                profileUpdate.displayName = displayName || req.decoded.name;
            }
            if (photoURL || req.decoded?.picture) {
                profileUpdate.photoURL = photoURL || req.decoded.picture;
            }

            if (Object.keys(profileUpdate).length > 0) {
                await updateUserByEmail(email, profileUpdate);
            }

            return res.status(200).json({ message: 'User already exists', inserted: false });
        }

        const newUser = {
            email,
            role: email === SUPER_ADMIN_EMAIL ? "superadmin" : (role || "user"),
            created_at: created_at || new Date().toISOString(),
            last_log_in: last_log_in || new Date().toISOString(),
            displayName: displayName || req.decoded?.name || "",
            photoURL: photoURL || req.decoded?.picture || "",
        };


        const result = await createUser(newUser);
        res.status(201).json({ message: 'User created successfully', userId: result.insertedId, inserted: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// GET /users
async function fetchAllUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// GET /users/:id
async function fetchUserById(req, res) {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function updateUser(req, res) {
    try {
        const email = req.decoded?.email || req.body.email;
        const { ...updateData } = req.body;

        if (!email) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const result = await updateUserByEmail(email, updateData);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found or nothing to update' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const searchUsers = async (req, res) => {
    const emailQuery = req.query.email;

    if (!emailQuery) {
        return res.status(400).send({ message: "Missing email query" });
    }

    try {
        const users = await searchUsersByEmail(emailQuery);
        res.status(200).send(users);
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).send({ message: "Error searching users" });
    }
};

const changeUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const requesterEmail = req.headers.email;

    try {
        const requester = await getUserByEmail(requesterEmail);

        if (!requester || requester.role !== "superadmin") {
            return res.status(403).send({
                message: "Only superadmin can change roles"
            });
        }

        const targetUser = await getUserById(id);

        if (!targetUser) {
            return res.status(404).send({ message: "User not found" });
        }

        if (!["user", "admin", "superadmin"].includes(role)) {
            return res.status(400).send({ message: "Invalid role" });
        }

        // 🚨 prevent self downgrade (optional safety)
        if (requester._id.toString() === id && role !== "superadmin") {
            return res.status(403).send({
                message: "You cannot downgrade yourself"
            });
        }

        await updateUserRole(id, role);

        res.status(200).send({
            message: `User role updated to ${role}`,
        });

    } catch (error) {
        res.status(500).send({
            message: "Failed to update role",
            error: error.message
        });
    }
};
const getUserRole = async (req, res) => {
    const { email } = req.query;

    // Validate email
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await getUserByEmail(email);

        // Always return role (default = user)
        const role = user?.role || "user";

        res.status(200).json({ role });

    } catch (error) {
        console.error("Error getting user role:", error);

        res.status(500).json({
            message: "Failed to get user role",
            role: "user"
        });
    }
};



// POST /internal/verify-role   Body: { token }
const verifyRoleInternal = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const decoded = await getAuth().verifyIdToken(token);
        const user = await getUserByEmail(decoded.email);

        if (!user) {
            return res.status(404).json({ message: "User not found", role: "user" });
        }

        return res.status(200).json({
            email: user.email,
            role: user.role || "user",
        });
    } catch (error) {
        console.error("verifyRoleInternal error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
// POST /internal/verify-token   body: { token }
const verifyTokenAndGetRole = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const decoded = await getAuth().verifyIdToken(token);
        const user = await getUserByEmail(decoded.email);

        return res.status(200).json({
            email: decoded.email,
            role: user?.role || "user",
        });
    } catch (error) {
        console.error("verifyTokenAndGetRole error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};


// GET /users/check?email=
const checkUserExists = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await getUserByEmail(email);

        if (user) {
            return res.status(200).json({
                exists: true,
                message: "Already registered, please login"
            });
        }

        res.status(200).json({
            exists: false
        });

    } catch (error) {
        console.error("Check user error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports =
{
    addUser,
    fetchAllUsers,
    fetchUserById,
    updateUser,
    searchUsers,
    changeUserRole,
    getUserRole,
    verifyRoleInternal,
    verifyTokenAndGetRole,
    checkUserExists
};