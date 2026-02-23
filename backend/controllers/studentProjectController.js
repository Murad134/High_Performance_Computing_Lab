// controllers/studentProjectController.js
const { ObjectId } = require("mongodb");
const { studentProjectsCollection } = require('../models/studentProjectModel');

// POST /studentProjects/add
async function addStudentProject(req, res) {
  try {
    const data = req.body;

    // Optional: you can validate here
    if (!data.student || !data.type) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    const result = await studentProjectsCollection().insertOne(data);
    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// GET /studentProjects
async function getAllStudentProjects(req, res) {
  try {
    const data = await studentProjectsCollection()
      .find({})
      .sort({ 'student.id': 1 })
      .toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

async function updateStudentProject(req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const result = await studentProjectsCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: 'Record not found or no change' });
    }

    res.status(200).json({ success: true, message: 'Updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
module.exports = { addStudentProject, getAllStudentProjects,updateStudentProject };