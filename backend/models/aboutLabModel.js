const { getCollection } = require('../config/db');

const COLLECTION = 'aboutlab';

async function createAboutLab(data) {
    const col = getCollection(COLLECTION);
    return col.insertOne({ ...data, created_at: new Date() });
}

async function getAboutLab() {
    const col = getCollection(COLLECTION);
    return col.findOne({});
}

async function updateAboutLab(data) {
    const col = getCollection(COLLECTION);
    return col.updateOne({}, { $set: { ...data, updated_at: new Date() } }, { upsert: true });
}

module.exports = { createAboutLab, getAboutLab, updateAboutLab };
