const { ObjectId } = require('mongodb');
const { getCollection } = require('../config/db');

const collectionName = 'images';

async function addImages(imagesArray) {
  const col = getCollection(collectionName);
  const result = await col.insertMany(imagesArray);
  return result;
}

async function getImages(filter = {}) {
  const col = getCollection(collectionName);
  return col.find(filter).toArray();
}

async function updateImage(id, data) {
  const col = getCollection(collectionName);
  await col.updateOne({ _id: new ObjectId(id) }, { $set: data });
}

async function deleteImage(id) {
  const col = getCollection(collectionName);
  await col.deleteOne({ _id: new ObjectId(id) });
}

module.exports = { addImages, getImages, updateImage, deleteImage };