// models/userModel.js
const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

const collectionName = 'users';

// Create user
async function createUser(user) {
    const usersCollection = getCollection(collectionName);
    return await usersCollection.insertOne(user);
}

// Get all users
async function getAllUsers() {
    const usersCollection = getCollection(collectionName);
    return await usersCollection.find({}).toArray();
}

// Get user by email
async function getUserByEmail(email) {
    const usersCollection = getCollection(collectionName);
    return await usersCollection.findOne({ email });
}

// Get user by ID
async function getUserById(id) {
    const usersCollection = getCollection(collectionName);
    return await usersCollection.findOne({ _id: new ObjectId(id) });
}

// Update user by email
async function updateUserByEmail(email, updateData) {
    const usersCollection = getCollection(collectionName);

    return await usersCollection.updateOne(
        { email },
        { $set: updateData },
        { upsert: true }
    );
}

// Search users by email
async function searchUsersByEmail(emailQuery) {
    const usersCollection = getCollection(collectionName);

    const regex = new RegExp(emailQuery, "i");

    return await usersCollection
        .find({ email: { $regex: regex } })
        .project({ email: 1, created_at: 1, role: 1, last_log_in: 1 })
        .limit(10)
        .toArray();
}


// async function updateUserRole(id, role) {
//     const usersCollection = getCollection(collectionName);
//     return await usersCollection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: { role } },
//         { upsert: true }
//     );
// };

async function updateUserRole(id, role) {
    const usersCollection = getCollection(collectionName);

    // ✅ Wrap ObjectId in try/catch for extra safety
    let objId;
    try {
        objId = new ObjectId(id);
    } catch (err) {
        console.error("Invalid ObjectId:", id);
        throw new Error("Invalid user ID");
    }

    return await usersCollection.updateOne(
        { _id: objId },
        { $set: { role } },
        { upsert: true }
    );
}


module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
    updateUserByEmail,
    searchUsersByEmail,
    updateUserRole
};