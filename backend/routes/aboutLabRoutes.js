const express = require('express');
const router = express.Router();
const { createAboutLab, getAboutLab, updateAboutLab } = require('../controllers/aboutLabController');

router.post('/', createAboutLab);
router.get('/', getAboutLab);
router.put('/', updateAboutLab);

module.exports = router;
