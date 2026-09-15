

// controllers/studentProjectController.js
const { ObjectId } = require("mongodb");
const { studentProjectsCollection } = require('../models/studentProjectModel');

// ===========================
// Add new student/project/thesis
// ===========================
async function addStudentProject(req, res) {
  try {
    const data = req.body;

    if (!data.student || !data.type) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    // ✅ CREATE NESTED IDS (project/thesis)
    if (data.type === "project" && data.project) {
      data.project._id = new ObjectId();
    }

    if (data.type === "thesis" && data.thesis) {
      data.thesis._id = new ObjectId();
    }

    data.status = data.status || "ongoing";       // backend field
    data.stdntstatus = data.stdntstatus || "ongoing"; // student status

    const result = await studentProjectsCollection().insertOne(data);

    res.status(201).json({
      success: true,
      insertedId: result.insertedId,
      projectId: data.project?._id || null,
      thesisId: data.thesis?._id || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// ===========================
// Get all students/projects/thesis
// ===========================
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

// ===========================
// Update any field (project/thesis/student info)
// ===========================
async function updateStudentProject(req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // ✅ Ensure nested _id exists
    if (updateData.type === "project" && updateData.project && !updateData.project._id) {
      updateData.project._id = new ObjectId();
    }
    if (updateData.type === "thesis" && updateData.thesis && !updateData.thesis._id) {
      updateData.thesis._id = new ObjectId();
    }

    const result = await studentProjectsCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    const updatedDoc = await studentProjectsCollection().findOne({ _id: new ObjectId(id) });

    res.status(200).json({ success: true, message: "Updated successfully", data: updatedDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// ===========================
// Update project/thesis status using nested _id
// ===========================
async function updateNestedStatus(req, res) {
  try {
    const nestedId = req.params.id;
    const { status, type } = req.body;

    if (!status || !type) {
      return res.status(400).json({
        success: false,
        message: "status and type are required",
      });
    }

    let filter = {};
    let updateField = {};

    if (type === "project") {
      filter = { "project._id": new ObjectId(nestedId) };
      updateField = { "project.projectstatus": status };
    }

    if (type === "thesis") {
      filter = { "thesis._id": new ObjectId(nestedId) };
      updateField = { "thesis.thesisstatus": status };
    }

    const result = await studentProjectsCollection().updateOne(
      filter,
      { $set: updateField }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: `${type} status updated to ${status}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// ===========================
// Update only student status (stdntstatus)
// ===========================
async function updateStudentStatus(req, res) {
  try {
    const id = req.params.id;
    const { stdntstatus } = req.body;

    if (!stdntstatus) {
      return res.status(400).json({ success: false, message: "stdntstatus is required" });
    }

    const result = await studentProjectsCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { stdntstatus } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: "Record not found or already updated" });
    }

    const updatedDoc = await studentProjectsCollection().findOne({ _id: new ObjectId(id) });
    res.status(200).json({ success: true, message: `Student status updated to ${stdntstatus}`, data: updatedDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// ===========================
// Delete student/project/thesis
// ===========================
async function deleteStudentProject(req, res) {
  try {
    const id = req.params.id;
    const result = await studentProjectsCollection().deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully', deletedId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

async function getSingleStudentProject(req, res) {
  try {
    const id = req.params.id;

    const data = await studentProjectsCollection().findOne({
      $or: [
        { "project._id": new ObjectId(id) },
        { "thesis._id": new ObjectId(id) }
      ]
    });

    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  addStudentProject,
  getAllStudentProjects,
  updateStudentProject,
  updateStudentStatus,
  updateNestedStatus,
  getSingleStudentProject,
  deleteStudentProject
};