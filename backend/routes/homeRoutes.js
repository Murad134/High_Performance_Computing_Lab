const express = require('express');
const router = express.Router();
const { getHome, postOrUpdateHome } = require('../controllers/homeController');



const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// GET home
router.get('/', getHome);

// POST or update (upsert)
router.post('/',verifyAdmin,verifyToken, postOrUpdateHome);

module.exports = router;