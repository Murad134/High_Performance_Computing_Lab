// const express = require('express');
// const router = express.Router();
// const { createJournalController, getAllJournalsController } = require('../controllers/journalController');

// // POST a new journal
// router.post('/', createJournalController);
// // GET all journals
// router.get('/', getAllJournalsController);
// module.exports = router;


const express = require('express');
const router = express.Router();
const {
    createJournalController,
    getAllJournalsController,
    updateJournalController,
    deleteJournalController,
    getJournalByIdController
} = require('../controllers/journalController');

// ---------------- CREATE ----------------
router.post('/', createJournalController);

// ---------------- READ ALL ----------------
router.get('/', getAllJournalsController);

// ---------------- READ BY ID ----------------
router.get('/:id', getJournalByIdController);

// ---------------- UPDATE ----------------
router.put('/:id', updateJournalController);

// ---------------- DELETE ----------------
router.delete('/:id', deleteJournalController);

module.exports = router;