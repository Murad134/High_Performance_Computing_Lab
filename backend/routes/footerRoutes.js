const express = require('express');
const router = express.Router();
const { createFooter, getFooter, updateFooter } = require('../controllers/footerController');
const verifyFBToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/', verifyFBToken, verifyAdmin, createFooter);
router.get('/', getFooter);
router.put('/', verifyFBToken, verifyAdmin, updateFooter);

module.exports = router;
