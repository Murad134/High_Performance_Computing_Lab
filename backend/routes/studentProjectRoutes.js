const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');


const {
  addStudentProject,
  getAllStudentProjects,
  updateStudentProject,
  updateStudentStatus,
  getSingleStudentProject,
  updateNestedStatus,
  deleteStudentProject
} = require('../controllers/studentProjectController');

router.post('/add', verifyToken, verifyAdmin, addStudentProject);
router.get('/', getAllStudentProjects);

// PATCH nested status (project/thesis)
router.patch('/nested-status/:id',verifyToken,verifyAdmin, updateNestedStatus);
// PATCH route to update only status
router.patch('/:id/status', verifyToken, verifyAdmin, updateStudentStatus);

// PUT route to update any field
router.put('/update/:id', verifyToken, verifyAdmin, updateStudentProject);

// DELETE student/project/thesis
router.delete('/:id', verifyToken, verifyAdmin, deleteStudentProject);
// GET single student project by ID
router.get('/:id', getSingleStudentProject);

module.exports = router;
