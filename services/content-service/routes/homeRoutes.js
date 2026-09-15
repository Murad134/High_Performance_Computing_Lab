const express = require('express');
const router = express.Router();
const { getHome, postOrUpdateHome } = require('../controllers/homeController');



// GET home
router.get('/', getHome);

// POST or update (upsert)
router.post('/', postOrUpdateHome);

module.exports = router;