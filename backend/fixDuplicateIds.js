const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@hpccluster.yy1i8d7.mongodb.net/?appName=hpccluster`;

async function fixDuplicates() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("hpc_lab");
  const collection = db.collection("departments");

  const allDepartments = await collection.find().toArray();

  const seenDeptIds = new Set();

  for (const dept of allDepartments) {
    // 🔹 Fix duplicate department _id
    if (seenDeptIds.has(dept._id.toString())) {
      const newId = new ObjectId();
      console.log(`Duplicate department _id found: ${dept._id}. Assigning new _id: ${newId}`);
      await collection.updateOne(
        { _id: dept._id },
        { $set: { _id: newId } }
      );
      dept._id = newId; // update local copy
    }
    seenDeptIds.add(dept._id.toString());

    // 🔹 Fix duplicate team _id inside this department
    if (dept.teams && dept.teams.length > 0) {
      const seenTeamIds = new Set();
      for (let i = 0; i < dept.teams.length; i++) {
        const team = dept.teams[i];
        if (seenTeamIds.has(team._id.toString())) {
          const newTeamId = new ObjectId();
          console.log(`Duplicate team _id in department ${dept.name}: ${team._id}. Assigning new _id: ${newTeamId}`);
          dept.teams[i]._id = newTeamId;
        }
        seenTeamIds.add(dept.teams[i]._id.toString());
      }

      // Update department teams after fixing
      await collection.updateOne(
        { _id: dept._id },
        { $set: { teams: dept.teams } }
      );
    }
  }

  console.log("Duplicate _id fix completed.");
  await client.close();
}

fixDuplicates();