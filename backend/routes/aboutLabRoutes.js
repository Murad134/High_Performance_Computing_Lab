const express = require('express');
const router = express.Router();
const { createAboutLab, getAboutLab, updateAboutLab } = require('../controllers/aboutLabController');



const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');


router.post('/', verifyToken, verifyAdmin, createAboutLab);
router.get('/', getAboutLab);
router.put('/', verifyToken, verifyAdmin, updateAboutLab);

module.exports = router;
