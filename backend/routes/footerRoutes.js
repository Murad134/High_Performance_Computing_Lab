const express = require('express');
const router = express.Router();
const { createFooter, getFooter, updateFooter } = require('../controllers/footerController');

router.post('/', createFooter);
router.get('/', getFooter);
router.put('/', updateFooter);

module.exports = router;
