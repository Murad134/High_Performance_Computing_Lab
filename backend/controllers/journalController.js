const {
    createJournal,
    getAllJournals,
    getJournalById,
    updateJournal,
    deleteJournal
} = require('../models/journalModel');

// ================= CREATE JOURNAL =================
exports.createJournalController = async (req, res) => {
    try {
        const data = req.body;
        const result = await createJournal(data);
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        console.error("Error creating journal:", err);
        res.status(500).json({ success: false, message: "Failed to create journal" });
    }
};

// ================= GET ALL JOURNALS =================
exports.getAllJournalsController = async (req, res) => {
    try {
        const journals = await getAllJournals();
        res.status(200).json(journals);
    } catch (err) {
        console.error("Error fetching journals:", err);
        res.status(500).json({ success: false, message: "Failed to get journals" });
    }
};

// ================= GET JOURNAL BY ID =================
exports.getJournalByIdController = async (req, res) => {
    try {
        const journalId = req.params.id;
        const journal = await getJournalById(journalId);

        if (!journal) {
            return res.status(404).json({ success: false, message: "Journal not found" });
        }

        res.status(200).json(journal);
    } catch (err) {
        console.error("Error fetching journal by ID:", err);
        res.status(500).json({ success: false, message: "Failed to get journal" });
    }
};

// ================= UPDATE JOURNAL =================
exports.updateJournalController = async (req, res) => {
    try {
        const journalId = req.params.id;
        const updateData = req.body;

        const result = await updateJournal(journalId, updateData);

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Journal not found" });
        }

        res.status(200).json({ success: true, message: "Journal updated successfully" });
    } catch (err) {
        console.error("Error updating journal:", err);
        res.status(500).json({ success: false, message: "Failed to update journal" });
    }
};

// ================= DELETE JOURNAL =================
exports.deleteJournalController = async (req, res) => {
    try {
        const journalId = req.params.id;

        const result = await deleteJournal(journalId);

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Journal not found" });
        }

        res.status(200).json({ success: true, message: "Journal deleted successfully" });
    } catch (err) {
        console.error("Error deleting journal:", err);
        res.status(500).json({ success: false, message: "Failed to delete journal" });
    }
};