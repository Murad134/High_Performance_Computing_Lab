const footerModel = require('../models/footerModel');

async function createFooter(req, res) {
    try {
        const result = await footerModel.createFooter(req.body);
        res.send(result);
    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            return res.status(400).send({ message: 'Footer already exists. Use PUT to update.' });
        }
        res.status(500).send({ message: 'Failed to create footer' });
    }
}

async function getFooter(req, res) {
    try {
        const footer = await footerModel.getFooter();
        res.send(footer);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch footer' });
    }
}

async function updateFooter(req, res) {
    try {
        const result = await footerModel.updateFooter(req.body);
        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            return res.status(404).send({ message: 'Footer not found' });
        }
        res.send({ message: 'Footer updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update footer' });
    }
}

module.exports = { createFooter, getFooter, updateFooter };
