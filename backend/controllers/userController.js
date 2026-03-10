// controllers/userController.js
const { ObjectId } = require('mongodb'); // ✅ make sure imported
const { createUser, getAllUsers, getUserByEmail, getUserById, updateUserByEmail, searchUsersByEmail, updateUserRole } = require('../models/userModel');

// POST /users
async function addUser(req, res) {
    try {
        const { email, role, created_at, last_log_in } = req.body;

        // Check if user exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(200).json({ message: 'User already exists', inserted: false });
        }

        const newUser = {
            email,
            role: role || 'user',
            created_at: created_at || new Date().toISOString(),
            last_log_in: last_log_in || new Date().toISOString(),
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
        const { email, ...updateData } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required to update user' });
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



// const changeUserRole = async (req, res) => {
//     const { id } = req.params;
//     const { role } = req.body;

//     // ✅ Validate role
//     if (!['admin', 'user'].includes(role)) {
//         return res.status(400).send({ message: "Invalid role" });
//     }

//     try {
//         const result = await updateUserRole(id, role);

//         if (result.matchedCount === 0) {
//             return res.status(404).send({ message: "User not found" });
//         }

//         res.status(200).send({
//             message: `User role updated to ${role}`,
//             result,
//         });
//     } catch (error) {
//         console.error("Error updating user role:", error);
//         res.status(500).send({ message: "Failed to update user role" });
//     }
// };

// const changeUserRole = async (req, res) => {
//     const { id } = req.params;
//     const { role } = req.body;

//     if (!['admin', 'user'].includes(role)) {
//         return res.status(400).send({ message: "Invalid role" });
//     }

//     // ✅ Validate ObjectId
//     if (!ObjectId.isValid(id)) {
//         return res.status(400).send({ message: "Invalid user ID" });
//     }

//     try {
//         const result = await updateUserRole(id, role);

//         if (result.matchedCount === 0) {
//             return res.status(404).send({ message: "User not found" });
//         }

//         res.status(200).send({
//             message: `User role updated to ${role}`,
//             result,
//         });
//     } catch (error) {
//         console.error("Error updating user role:", error);
//         res.status(500).send({ message: "Failed to update user role", error: error.message });
//     }
// };

const changeUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    if (!['admin', 'user'].includes(role)) {
        return res.status(400).send({ message: "Invalid role" });
    }

    // ✅ Validate ObjectId
    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid user ID" });
    }

    try {
        const result = await updateUserRole(id, role);

        if (result.matchedCount === 0) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({
            message: `User role updated to ${role}`,
            result,
        });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).send({ message: "Failed to update user role", error: error.message });
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
    checkUserExists
};