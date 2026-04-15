const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');





const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');
// GET all conferences
router.get('/', conferenceController.getConferences);

// POST a new conference
router.post('/', verifyToken, verifyAdmin, conferenceController.addConference);

// PUT update a conference
router.put('/:id', verifyToken, verifyAdmin, conferenceController.updateConference);

// DELETE a conference
router.delete('/:id', verifyToken, verifyAdmin, conferenceController.deleteConference);

module.exports = router;