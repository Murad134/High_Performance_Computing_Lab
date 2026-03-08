const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

class ConferenceModel {
  static collectionName = 'conferences';

  static async create(conferenceData) {
    const collection = getCollection(this.collectionName);
    const result = await collection.insertOne(conferenceData);
    return result;
  }

  static async getAll() {
    const collection = getCollection(this.collectionName);
    const data = await collection.find({}).toArray();
    return data;
  }

  static async getById(id) {
    const collection = getCollection(this.collectionName);
    const data = await collection.findOne({ _id: new ObjectId(id) });
    return data;
  }

  static async updateById(id, updateData) {
    const collection = getCollection(this.collectionName);

    // Prevent _id from being updated
    if (updateData._id) delete updateData._id;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return result;
  }

  static async deleteById(id) {
    const collection = getCollection(this.collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  }
}

module.exports = ConferenceModel;