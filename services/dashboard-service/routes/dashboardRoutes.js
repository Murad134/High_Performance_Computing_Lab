const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');

// Statistics are displayed on the public homepage. The individual service
// requests remain protected by the internal secret in the controller.
router.get('/stats', getDashboardStats);

module.exports = router;