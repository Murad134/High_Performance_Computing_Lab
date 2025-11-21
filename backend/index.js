const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 2100;
cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Project Backend is running')
})
// murad25cse_db_user
//GOqe20m2wER8ZDCb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@hpccluster1.pfkoxls.mongodb.net/?appName=hpccluster1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`My project is running in port ${port}`)
})