// // controllers/studentProjectController.js
// const { ObjectId } = require("mongodb");
// const { studentProjectsCollection } = require('../models/studentProjectModel');

// // POST /studentProjects/add
// async function addStudentProject(req, res) {
//   try {
//     const data = req.body;

//     // Optional: you can validate here
//     if (!data.student || !data.type) {
//       return res.status(400).json({ success: false, message: 'Invalid data' });
//     }

//     const result = await studentProjectsCollection().insertOne(data);
//     res.status(201).json({ success: true, insertedId: result.insertedId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// }

// // GET /studentProjects
// async function getAllStudentProjects(req, res) {
//   try {
//     const data = await studentProjectsCollection()
//       .find({})
//       .sort({ 'student.id': 1 })
//       .toArray();
//     res.status(200).json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// }

// async function updateStudentProject(req, res) {
//   try {
//     const id = req.params.id;
//     const updateData = req.body;

//     const result = await studentProjectsCollection().updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData }
//     );

//     if (result.modifiedCount === 0) {
//       return res.status(404).json({ success: false, message: 'Record not found or no change' });
//     }

//     res.status(200).json({ success: true, message: 'Updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// }
// module.exports = { addStudentProject, getAllStudentProjects,updateStudentProject };

const { ObjectId } = require("mongodb");
const { studentProjectsCollection } = require('../models/studentProjectModel');

// Add new student/project/thesis
async function addStudentProject(req, res) {
  try {
    const data = req.body;
    if (!data.student || !data.type)
      return res.status(400).json({ success: false, message: 'Invalid data' });

    const result = await studentProjectsCollection().insertOne(data);
    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// Get all students/projects/thesis
async function getAllStudentProjects(req, res) {
  try {
    const data = await studentProjectsCollection()
      .find({})
      .sort({ 'student.roll': 1 })
      .toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// Update any field
async function updateStudentProject(req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await studentProjectsCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0)
      return res.status(404).json({ success: false, message: 'Record not found or no change' });

    const updatedDoc = await studentProjectsCollection().findOne({ _id: new ObjectId(id) });
    res.status(200).json({ success: true, message: 'Updated successfully', data: updatedDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// ✅ Update only status
async function updateStudentStatus(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: 'Status required' });

    const result = await studentProjectsCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 0)
      return res.status(404).json({ success: false, message: 'Record not found or already updated' });

    const updatedDoc = await studentProjectsCollection().findOne({ _id: new ObjectId(id) });
    res.status(200).json({ success: true, message: `Status updated to ${status}`, data: updatedDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// ✅ Delete student/project/thesis
async function deleteStudentProject(req, res) {
  try {
    const id = req.params.id;
    const result = await studentProjectsCollection().deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0)
      return res.status(404).json({ success: false, message: 'Record not found' });

    res.status(200).json({ success: true, message: 'Deleted successfully', deletedId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { 
  addStudentProject,
  getAllStudentProjects,
  updateStudentProject,
  updateStudentStatus,
  deleteStudentProject
};