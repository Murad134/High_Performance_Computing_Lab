
const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

const collectionName = "journals";

// ---------------- CREATE ----------------
async function createJournal(data) {
    const collection = getCollection(collectionName);

    const journal = {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
    };

    const result = await collection.insertOne(journal);
    return result;
}

// ---------------- READ ALL ----------------
async function getAllJournals() {
    const collection = getCollection(collectionName);
    return await collection.find().sort({ created_at: -1 }).toArray();
}

// ---------------- READ BY ID ----------------
async function getJournalById(id) {
    const collection = getCollection(collectionName);
    return await collection.findOne({ _id: new ObjectId(id) });
}

// ---------------- UPDATE ----------------
async function updateJournal(id, data) {
    const collection = getCollection(collectionName);

    const { _id, ...restData } = data; // remove immutable _id if present
    const updatedData = {
        $set: {
            ...restData,
            updated_at: new Date(),
        },
    };

    return await collection.updateOne({ _id: new ObjectId(id) }, updatedData);
}

// ---------------- DELETE ----------------
async function deleteJournal(id) {
    const collection = getCollection(collectionName);
    return await collection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
    createJournal,
    getAllJournals,
    getJournalById,
    updateJournal,
    deleteJournal
};