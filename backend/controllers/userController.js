// controllers/userController.js
const { createUser, getAllUsers, getUserByEmail, getUserById, updateUserByEmail } = require('../models/userModel');

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
module.exports = { addUser, fetchAllUsers, fetchUserById, updateUser };