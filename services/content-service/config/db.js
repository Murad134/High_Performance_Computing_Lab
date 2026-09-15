const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@content-service.uti5xmy.mongodb.net/?appName=content-service`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connectToDb() {
    if (!db) {
        await client.connect();
        db = client.db('content-service');
        await client.db("admin").command({ ping: 1 });
        console.log('Connected to MongoDB');
    }
    return db;
}

function getCollection(name) {
    if (!db) throw new Error('Database not connected. Call connectToDb first.');
    return db.collection(name);
}
module.exports = { connectToDb, getCollection, client };