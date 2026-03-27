// models/homeModel.js
const { getCollection } = require('../config/db');

function getHomeCollection() {
    return getCollection('home');
}

// Fetch the home document
async function findHome() {
    const collection = getHomeCollection();
    const homeDoc = await collection.findOne({});
    return homeDoc;
}

// Update home document (upsert)
async function updateHome(data) {
    const collection = getHomeCollection();
    const result = await collection.updateOne({}, { $set: data }, { upsert: true });
    return result;
}

module.exports = { findHome, updateHome };