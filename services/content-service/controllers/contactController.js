const contactModel = require('../models/contactModel');

async function postContact(req, res) {
    try {
        const result = await contactModel.postContact(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Failed to submit contact form' });
    }
}

async function getContact(req, res) {
    try {
        const contacts = await contactModel.getContact();
        res.send(contacts);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch contact data' });
    }
}

async function updateContact(req, res) {
    try {
        const result = await contactModel.updateContact(req.body);
        res.send({ message: 'Contact updated successfully', result });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update contact' });
    }
}

module.exports = { postContact, getContact, updateContact };
