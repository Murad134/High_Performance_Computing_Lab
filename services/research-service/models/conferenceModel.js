const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

class ConferenceModel {
  static collectionName = 'conferences';

  static normalizeConferencePayload(payload = {}) {
    const normalizedAuthors = Array.isArray(payload.authors)
      ? payload.authors
          .map((a) => (typeof a === 'string' ? { name: a } : { name: a?.name || '' }))
          .filter((a) => a.name)
      : [];

    const normalizedKeywords = Array.isArray(payload.keywords)
      ? payload.keywords.map((k) => String(k || '').trim()).filter(Boolean)
      : [];

    return {
      ...payload,
      title: payload.title || '',
      conferenceName: payload.conferenceName || payload.publicationName || payload.journalName || '',
      conferenceVolume: payload.conferenceVolume || payload.volume || '',
      issue: payload.issue || '',
      pp: payload.pp || payload.pages || '',
      publicationName: payload.publicationName || payload.journalName || '',
      publicationUrl: payload.publicationUrl || payload.articleUrl || payload.link || '',
      yearOfPublication: payload.yearOfPublication || payload.year || '',
      publisher: payload.publisher || '',
      keywords: normalizedKeywords,
      authors: normalizedAuthors,
      updatedAt: new Date(),
    };
  }

  static normalizeConferenceResponse(doc = {}) {
    return {
      ...doc,
      conferenceName: doc.conferenceName || doc.publicationName || doc.journalName || '',
      conferenceVolume: doc.conferenceVolume || doc.volume || '',
      pp: doc.pp || doc.pages || '',
      publicationName: doc.publicationName || doc.journalName || '',
      publicationUrl: doc.publicationUrl || doc.articleUrl || doc.link || '',
      yearOfPublication: doc.yearOfPublication || doc.year || '',
      keywords: Array.isArray(doc.keywords) ? doc.keywords : [],
      authors: Array.isArray(doc.authors)
        ? doc.authors.map((a) => (typeof a === 'string' ? { name: a } : { name: a?.name || '' }))
        : [],
    };
  }

  static async create(conferenceData) {
    const collection = getCollection(this.collectionName);
    const normalized = this.normalizeConferencePayload(conferenceData);
    normalized.createdAt = new Date();
    const result = await collection.insertOne(normalized);
    return result;
  }

  static async getAll() {
    const collection = getCollection(this.collectionName);
    const data = await collection.find({}).toArray();
    return data.map((d) => this.normalizeConferenceResponse(d));
  }

  static async getById(id) {
    const collection = getCollection(this.collectionName);
    const data = await collection.findOne({ _id: new ObjectId(id) });
    return data ? this.normalizeConferenceResponse(data) : null;
  }

  static async updateById(id, updateData) {
    const collection = getCollection(this.collectionName);

    // Prevent _id from being updated
    if (updateData._id) delete updateData._id;

    const normalized = this.normalizeConferencePayload(updateData);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: normalized }
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