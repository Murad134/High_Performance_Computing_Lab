const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

const collectionName = 'otherCountryProjects';

async function createProject(data) {
    const collection = getCollection(collectionName);
    const result = await collection.insertOne(data);
    return result;
}

async function getAllProjects() {
    const collection = getCollection(collectionName);
    return await collection.find({}).toArray();
}

async function getProjectById(id) {
    const collection = getCollection(collectionName);
    return await collection.findOne({ _id: new ObjectId(id) });
}

async function updateProject(id, data) {
    const collection = getCollection(collectionName);
    return await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
}

async function deleteProject(id) {
    const collection = getCollection(collectionName);
    return await collection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};