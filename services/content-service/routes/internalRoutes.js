const express = require("express");

const router = express.Router();

const internalAuth = require("../middleware/internalAuth");

const { getCollection } = require('../config/db');

router.get("/health", internalAuth, (req, res) => {
    res.status(200).json({
        service: "content-service",
        status: "healthy",
    });
});



router.get('/stats/content', internalAuth, async (req, res) => {
  try {
    const aboutProf = await getCollection('aboutprof')
      .findOne({}, { sort: { updated_at: -1 } });
    res.json({
      aboutProf,
      lastUpdated: aboutProf?.updated_at || null,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch content stats' });
  }
});

module.exports = router;