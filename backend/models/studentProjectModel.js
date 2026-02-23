// models/studentProjectModel.js
const { getCollection } = require('../config/db');

function studentProjectsCollection() {
  return getCollection('studentProject'); // collection name
}

module.exports = { studentProjectsCollection };