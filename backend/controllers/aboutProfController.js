const aboutProfModel = require('../models/aboutProfModel');

async function createAboutProf(req, res) {
    try {
        const result = await aboutProfModel.createAboutProf(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Failed to submit aboutprof form' });
    }
}

async function getAboutProf(req, res) {
    try {
        const aboutprof = await aboutProfModel.getAboutProf();
        res.send(aboutprof);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch aboutprof data' });
    }
}

async function updateAboutProf(req, res) {
    try {
        const result = await aboutProfModel.updateAboutProf(req.body);
        res.send({ message: 'Updated successfully', result });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update', error: error.message });
    }
}

async function addInterest(req, res) {
    try {
        const { title } = req.body;
        const result = await aboutProfModel.addInterest(title);
        res.send({ message: 'Research Interest added successfully', result });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add research interest', error: error.message });
    }
}

async function updateInterest(req, res) {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const result = await aboutProfModel.updateInterest(id, title);
        res.send({ message: 'Research Interest updated successfully', result });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update research interest', error: error.message });
    }
}

async function deleteInterest(req, res) {
    try {
        const { id } = req.params;
        const result = await aboutProfModel.deleteInterest(id);
        res.send({ message: 'Research Interest deleted successfully', result });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete research interest', error: error.message });
    }
}

module.exports = {
    createAboutProf,
    getAboutProf,
    updateAboutProf,
    addInterest,
    updateInterest,
    deleteInterest
};
