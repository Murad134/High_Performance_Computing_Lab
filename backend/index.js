const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 2500;
cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Project Backend is running')
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@hpccluster.yy1i8d7.mongodb.net/?appName=hpccluster`;
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
        const db = client.db('hpc_lab');
        const footerCollection = db.collection('footer');  // Footer collection
        const contactCollection = db.collection('contact');  // Contact collection
        const aboutlabCollection = db.collection('aboutlab');  // About lab collection
        const aboutprofCollection = db.collection('aboutprof');  // About professor collection


        //-----------------------------------API endpoint to get footer data--------------------------------------
        app.post("/footer", async (req, res) => {
            try {
                const exists = await footerCollection.findOne({});

                if (exists) {
                    return res.status(400).send({
                        message: "Footer already exists. Use PUT to update.",
                    });
                }
                const newFooter = {
                    ...req.body,
                    created_at: new Date(),
                };
                const result = await footerCollection.insertOne(newFooter);
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to create footer" });
            }
        });
        // get footer data
        app.get("/footer", async (req, res) => {
            try {
                const footer = await footerCollection.findOne({});
                res.send(footer);
            } catch (error) {
                res.status(500).send({ message: "Failed to fetch footer" });
            }
        });

        // Update footer data
        app.put("/footer", async (req, res) => {
            try {
                const result = await footerCollection.updateOne(
                    {}, // match the single document
                    {
                        $set: {
                            ...req.body,
                            updated_at: new Date(),
                        },
                    }
                );
                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: "Footer not found" });
                }
                res.send({ message: "Footer updated successfully" });
            } catch (error) {
                res.status(500).send({ message: "Failed to update footer" });
            }
        });

        //-------------------------------API endpoint to submit contact form--------------------------------------
        // post contact data
        app.post("/contact", async (req, res) => {
            try {
                const newContact = {
                    ...req.body,
                    created_at: new Date(),
                };
                const result = await contactCollection.insertOne(newContact);
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to submit contact form" });
            }
        });
        // get contact data
        app.get("/contact", async (req, res) => {
            try {
                const contacts = await contactCollection.findOne({});
                res.send(contacts);
            }
            catch (error) {
                res.status(500).send({ message: "Failed to fetch contact data" });
            }
        });

        //Update contact data
        app.put("/contact", async (req, res) => {
            try {
                const result = await contactCollection.updateOne(
                    {}, // match the single document
                    {
                        $set: {
                            ...req.body,
                            updated_at: new Date(),
                        },
                    },
                    { upsert: true }
                );
                res.send({ message: "Contact updated successfully", result });
            } catch (error) {
                res.status(500).send({ message: "Failed to update contact" });
            }
        });


        //---------------------------------------API for about section-------------------------

        // post about lab data
        app.post('/aboutlab', async (req, res) => {
            try {
                const newAboutLab = {
                    ...req.body,
                    created_at: new Date(),
                };
                const result = await aboutlabCollection.insertOne(newAboutLab);
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to submit aboutlab form" });
            }
        });

        // get about lab data
        app.get('/aboutlab', async (req, res) => {
            try {
                const aboutlab = await aboutlabCollection.findOne({});
                res.send(aboutlab);
            }
            catch (error) {
                res.status(500).send({ message: "Failed to fetch aboutlab data" });
            }
        });

        // Update about lab data
        app.put('/aboutlab', async (req, res) => {
            try {
                const result = await aboutlabCollection.updateOne(
                    {}, // match the single document
                    {
                        $set: {
                            ...req.body,
                            updated_at: new Date(),
                        },
                    },
                    { upsert: true }
                );
                res.send({ message: "About lab updated successfully", result });
            } catch (error) {
                res.status(500).send({ message: "Failed to update about lab", error });
            }
        });



        //--------------------------Api for AboutProfessor section-------------------------
        // post about professor data
        app.post('/aboutprof', async (req, res) => {
            try {
                const newAboutProf = {
                    ...req.body,
                    created_at: new Date(),
                };
                const result = await aboutprofCollection.insertOne(newAboutProf);
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to submit aboutprof form" });
            }
        });

        // get about professor data
        app.get('/aboutprof', async (req, res) => {
            try {
                const aboutprof = await aboutprofCollection.findOne({});
                res.send(aboutprof);
            }
            catch (error) {
                res.status(500).send({ message: "Failed to fetch aboutprof data" });
            }
        });
        // update about professor data
        // app.put('/aboutprof', async (req, res) => {
        //     console.log("PUT /aboutprof received:", req.body);
        //     try {
        //         const updatedData = {
        //             ...req.body,
        //             updated_at: new Date(),
        //         };
        //         const result = await aboutprofCollection.updateOne(
        //             {},   // update first document
        //             { $set: updatedData },
        //             { upsert: true }
        //         );
        //         res.send({ message: "Updated successfully", result });
        //     } catch (error) {
        //         console.error("Update Error:", error);
        //         res.status(500).send({ message: "Failed to update", error: error.message });
        //     }
        // });


        app.put('/aboutprof', async (req, res) => {
            console.log("PUT /aboutprof received:", req.body);
            try {
                const { _id, created_at, ...rest } = req.body;

                const result = await aboutprofCollection.updateOne(
                    {}, // finds the single document
                    { $set: { ...rest, updated_at: new Date() } }
                );

                res.send({ message: "Updated successfully", result });
            } catch (error) {
                console.error("Update Error:", error);
                res.status(500).send({ message: "Failed to update", error: error.message });
            }
        });
        //----------------------------Research Interests API-------------------------
        // ---------------- Add Research Interest ----------------
        app.put('/aboutprof/add-interest', async (req, res) => {
            try {
                const { title } = req.body;

                if (!title || !title.trim()) {
                    return res.status(400).send({ message: "Title is required" });
                }

                const newInterest = {
                    _id: new ObjectId(),
                    title: title.trim(),
                    created_at: new Date()
                };

                const result = await aboutprofCollection.updateOne(
                    {}, // single document
                    {
                        $push: { researchInterests: newInterest },
                        $set: { updated_at: new Date() }
                    },
                    { upsert: true }
                );

                res.send({
                    message: "Research Interest added successfully",
                    result
                });

            } catch (error) {
                console.error("Add Interest Error:", error);
                res.status(500).send({
                    message: "Failed to add research interest",
                    error: error.message
                });
            }
        });
        // Update Research Interest
        app.put('/aboutprof/interest/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { title } = req.body;

                if (!title || !title.trim()) {
                    return res.status(400).send({ message: "Title is required" });
                }

                const result = await aboutprofCollection.updateOne(
                    { "researchInterests._id": new ObjectId(id) },
                    {
                        $set: {
                            "researchInterests.$.title": title.trim(),
                            updated_at: new Date()
                        }
                    }
                );

                res.send({
                    message: "Research Interest updated successfully",
                    result
                });

            } catch (error) {
                console.error("Update Interest Error:", error);
                res.status(500).send({
                    message: "Failed to update research interest",
                    error: error.message
                });
            }
        });
        // Delete Research Interest
        app.delete('/aboutprof/interest/:id', async (req, res) => {
            try {
                const { id } = req.params;

                const result = await aboutprofCollection.updateOne(
                    {},
                    {
                        $pull: { researchInterests: { _id: new ObjectId(id) } },
                        $set: { updated_at: new Date() }
                    }
                );

                res.send({
                    message: "Research Interest deleted successfully",
                    result
                });

            } catch (error) {
                console.error("Delete Interest Error:", error);
                res.status(500).send({
                    message: "Failed to delete research interest",
                    error: error.message
                });
            }
        });
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`My project is running in port ${port}`)
})