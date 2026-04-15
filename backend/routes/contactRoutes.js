const express = require('express');
const router = express.Router();
const { postContact, getContact, updateContact } = require('../controllers/contactController');



const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/', verifyToken, verifyAdmin, postContact);
router.get('/', getContact);
router.put('/', verifyToken, verifyAdmin, updateContact);

module.exports = router;