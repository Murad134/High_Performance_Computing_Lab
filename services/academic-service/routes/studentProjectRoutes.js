const express = require('express');
const router = express.Router();

const {
  addStudentProject,
  getAllStudentProjects,
  updateStudentProject,
  updateStudentStatus,
  getSingleStudentProject,
  updateNestedStatus,
  deleteStudentProject
} = require('../controllers/studentProjectController');

router.post('/add', addStudentProject);
router.get('/', getAllStudentProjects);

// PATCH nested status (project/thesis)
router.patch('/nested-status/:id', updateNestedStatus);
// PATCH route to update only status
router.patch('/:id/status', updateStudentStatus);

// PUT route to update any field
router.put('/update/:id', updateStudentProject);

// DELETE student/project/thesis
router.delete('/:id',  deleteStudentProject);
// GET single student project by ID
router.get('/:id', getSingleStudentProject);

module.exports = router;
