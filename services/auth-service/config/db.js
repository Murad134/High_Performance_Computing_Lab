const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI ||
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@auth-services.zrfckhp.mongodb.net/?appName=auth-services`;
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
        db = client.db(process.env.DB_NAME || 'auth_services');
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






// const { MongoClient, ServerApiVersion } = require('mongodb');

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
