const express = require('express');
const router = express.Router();
const controller = require('../controllers/otherCountryProjectController');

router.get('/', controller.getProjects);           // GET all projects
router.post('/', controller.addProject);           // ADD new project
router.put('/:id', controller.updateProject);     // UPDATE existing project
router.delete('/:id', controller.deleteProject);  // DELETE project

module.exports = router;