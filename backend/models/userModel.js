// models/userModel.js
const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

const collectionName = 'users';

// Create user
async function createUser(user) {
    const usersCollection = getCollection(collectionName);
    const result = await usersCollection.insertOne(user);
    return result;
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
async function updateUserByEmail(email, updateData) {
    const usersCollection = getCollection('users');
    const result = await usersCollection.updateOne(
        { email },
        { $set: updateData },
        { upsert: true }
    );
    return result;
}
module.exports = { createUser, getAllUsers, getUserByEmail, getUserById, updateUserByEmail };