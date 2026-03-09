const express = require('express');
const router = express.Router();
const { createFooter, getFooter, updateFooter } = require('../controllers/footerController');
const verifyFBToken = require('../middleware/verifyFBToken');

router.post('/', verifyFBToken, createFooter);
router.get('/',verifyFBToken, getFooter);
router.put('/', verifyFBToken, updateFooter);

module.exports = router;
