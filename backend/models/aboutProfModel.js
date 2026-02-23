const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'aboutprof';

async function createAboutProf(data) {
    const col = getCollection(COLLECTION);
    return col.insertOne({ ...data, created_at: new Date() });
}

async function getAboutProf() {
    const col = getCollection(COLLECTION);
    return col.findOne({});
}

async function updateAboutProf(data) {
    const { _id, created_at, ...rest } = data;
    const col = getCollection(COLLECTION);
    return col.updateOne({}, { $set: { ...rest, updated_at: new Date() } }, { upsert: true });
}

async function addInterest(title) {
    if (!title || !title.trim()) throw new Error('Title is required');
    const col = getCollection(COLLECTION);
    const newInterest = { _id: new ObjectId(), title: title.trim(), created_at: new Date() };
    return col.updateOne({}, { $push: { researchInterests: newInterest }, $set: { updated_at: new Date() } }, { upsert: true });
}

async function updateInterest(id, title) {
    if (!title || !title.trim()) throw new Error('Title is required');
    const col = getCollection(COLLECTION);
    return col.updateOne({ 'researchInterests._id': new ObjectId(id) }, { $set: { 'researchInterests.$.title': title.trim(), updated_at: new Date() } });
}

async function deleteInterest(id) {
    const col = getCollection(COLLECTION);
    return col.updateOne({}, { $pull: { researchInterests: { _id: new ObjectId(id) } }, $set: { updated_at: new Date() } });
}

module.exports = {
    createAboutProf,
    getAboutProf,
    updateAboutProf,
    addInterest,
    updateInterest,
    deleteInterest
};
