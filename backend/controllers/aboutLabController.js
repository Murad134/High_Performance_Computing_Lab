const aboutLabModel = require('../models/aboutLabModel');

async function createAboutLab(req, res) {
    try {
        const result = await aboutLabModel.createAboutLab(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Failed to submit aboutlab form' });
    }
}

async function getAboutLab(req, res) {
    try {
        const aboutlab = await aboutLabModel.getAboutLab();
        res.send(aboutlab);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch aboutlab data' });
    }
}

async function updateAboutLab(req, res) {
    try {
        const result = await aboutLabModel.updateAboutLab(req.body);
        res.send({ message: 'About lab updated successfully', result });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update about lab', error });
    }
}

module.exports = { createAboutLab, getAboutLab, updateAboutLab };
