const { getCollection } = require('../config/db');

const getBookCollection = () => getCollection('books');

module.exports = { getBookCollection };