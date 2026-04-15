const express = require('express');
const router = express.Router();
const controller = require('../controllers/departmentController');


const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/',verifyToken,verifyAdmin, controller.createDepartment);
router.get('/', controller.getDepartments);
router.get('/:id', controller.getDepartmentById);
router.put('/:id', verifyToken, verifyAdmin, controller.updateDepartment);
router.delete('/:id', verifyToken, verifyAdmin, controller.deleteDepartment);

module.exports = router;
