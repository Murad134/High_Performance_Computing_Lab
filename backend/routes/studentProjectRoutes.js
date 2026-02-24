const express = require('express');
const router = express.Router();
const {
  addStudentProject,
  getAllStudentProjects,
  updateStudentProject,
  updateStudentStatus,
  deleteStudentProject
} = require('../controllers/studentProjectController');

router.post('/add', addStudentProject);
router.get('/', getAllStudentProjects);

// PATCH route to update only status
router.patch('/:id/status', updateStudentStatus);

// PUT route to update any field
router.put('/update/:id', updateStudentProject);

// DELETE student/project/thesis
router.delete('/:id', deleteStudentProject);

module.exports = router;