const ConferenceModel = require('../models/conferenceModel');
const { ObjectId } = require('mongodb');

exports.getConferences = async (req, res) => {
  try {
    const conferences = await ConferenceModel.getAll();
    res.status(200).json(conferences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch conferences' });
  }
};

exports.addConference = async (req, res) => {
  try {
    const data = req.body;
    const result = await ConferenceModel.create(data);
    res.status(201).json({ message: 'Conference added', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add conference' });
  }
};

exports.updateConference = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Ensure _id is never overwritten
    if (data._id) delete data._id;

    const result = await ConferenceModel.updateById(id, data);
    res.status(200).json({ message: 'Conference updated successfully', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update conference' });
  }
};

exports.deleteConference = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ConferenceModel.deleteById(id);
    res.status(200).json({ message: 'Conference deleted', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete conference' });
  }
};

