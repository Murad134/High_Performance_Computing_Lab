const express = require('express');
const router = express.Router();
const { postContact, getContact, updateContact } = require('../controllers/contactController');



router.post('/',  postContact);
router.get('/', getContact);
router.put('/',  updateContact);

module.exports = router;