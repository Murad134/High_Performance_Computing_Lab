const { getCollection } = require('../config/db');

const COLLECTION = 'footer';

async function createFooter(data) {
    const col = getCollection(COLLECTION);
    const exists = await col.findOne({});
    if (exists) throw new Error('Footer already exists');
    return col.insertOne({ ...data, created_at: new Date() });
}

async function getFooter() {
    const col = getCollection(COLLECTION);
    return col.findOne({});
}

async function updateFooter(data) {
    const col = getCollection(COLLECTION);
    return col.updateOne({}, { $set: { ...data, updated_at: new Date() } });
}

module.exports = { createFooter, getFooter, updateFooter };