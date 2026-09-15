const express = require("express");

const router = express.Router();

const internalAuth = require("../middleware/internalAuth");

const { getCollection } = require('../config/db');

const bookController = require("../controllers/bookController");
const conferenceController = require("../controllers/conferenceController");

const {
  getAllJournalsController,
  getJournalByIdController,
} = require("../controllers/journalController");

// Protect all internal routes
router.use(internalAuth);

// ===============================
// Books
// ===============================

router.get("/books", bookController.getAllBooks);

router.get("/books/:id", bookController.getBookById);

// ===============================
// Conferences
// ===============================

router.get(
  "/conferences",
  conferenceController.getConferences
);

// ===============================
// Journals
// ===============================

router.get(
  "/journals",
  getAllJournalsController
);

router.get(
  "/journals/:id",
  getJournalByIdController
);




router.get('/stats/research', async (req, res) => {
  try {
    const journalsCollection = getCollection('journals');
    const conferencesCollection = getCollection('conferences');
    const booksCollection = getCollection('books');

    const [journals, conferences, books] = await Promise.all([
      journalsCollection.countDocuments(),
      conferencesCollection.countDocuments(),
      booksCollection.countDocuments(),
    ]);

    const [latestJournal, latestConf, latestBook] = await Promise.all([
      journalsCollection.findOne({}, { sort: { updated_at: -1 }, projection: { updated_at: 1 } }),
      conferencesCollection.findOne({}, { sort: { updated_at: -1 }, projection: { updated_at: 1 } }),
      booksCollection.findOne({}, { sort: { updated_at: -1 }, projection: { updated_at: 1 } }),
    ]);
    const lastUpdated = [latestJournal?.updated_at, latestConf?.updated_at, latestBook?.updated_at]
      .filter(Boolean)
      .sort((a, b) => b - a)[0] || null;

    res.json({
      journals,
      conferences,
      books,
      totalPublications: journals + conferences + books,
      lastUpdated,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch research stats' });
  }
});

module.exports = router;