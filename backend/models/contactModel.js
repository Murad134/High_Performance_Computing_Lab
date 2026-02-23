const { getCollection } = require('../config/db');

const COLLECTION = 'contact';

async function postContact(data) {
    const col = getCollection(COLLECTION);
    return col.insertOne({ ...data, created_at: new Date() });
}

async function getContact() {
    const col = getCollection(COLLECTION);
    return col.findOne({});
}

async function updateContact(data) {
    const col = getCollection(COLLECTION);
    return col.updateOne({}, { $set: { ...data, updated_at: new Date() } }, { upsert: true });
}

module.exports = { postContact, getContact, updateContact };
