// routes/studentProjectRoutes.js
const express = require('express');
const router = express.Router();
const { addStudentProject, getAllStudentProjects,updateStudentProject } = require('../controllers/studentProjectController');

router.post('/add', addStudentProject);
router.get('/', getAllStudentProjects);
router.put('/update/:id', updateStudentProject);

module.exports = router;