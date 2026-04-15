const express = require('express');
const router = express.Router();
const {
    createJournalController,
    getAllJournalsController,
    updateJournalController,
    deleteJournalController,
    getJournalByIdController
} = require('../controllers/journalController');


const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const verifyFBToken = require('../middleware/verifyFBToken');


// ---------------- CREATE ----------------
router.post('/',verifyToken,verifyAdmin, createJournalController);

// ---------------- READ ALL ----------------
router.get('/', getAllJournalsController);

// ---------------- READ BY ID ----------------
router.get('/:id', getJournalByIdController);

// ---------------- UPDATE ----------------
router.put('/:id',verifyFBToken,verifyAdmin, updateJournalController);

// ---------------- DELETE ----------------
router.delete('/:id',verifyToken,verifyAdmin, deleteJournalController);

module.exports = router;