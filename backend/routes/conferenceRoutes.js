// const express = require('express');
// const router = express.Router();
// const conferenceController = require('../controllers/conferenceController');

// // GET all conferences
// router.get('/', conferenceController.getConferences);

// // POST a new conference
// router.post('/', conferenceController.addConference);

// module.exports = router;



const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');

// GET all conferences
router.get('/', conferenceController.getConferences);

// POST a new conference
router.post('/', conferenceController.addConference);

// PUT update a conference
router.put('/:id', conferenceController.updateConference);

// DELETE a conference
router.delete('/:id', conferenceController.deleteConference);

module.exports = router;