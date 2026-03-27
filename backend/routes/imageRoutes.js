const express = require('express');
const router = express.Router();
const {
  getAllImages,
  addNewImages,
  updateExistingImage,
  deleteExistingImage
} = require('../controllers/imageController');

router.get('/', getAllImages);
router.post('/', addNewImages);
router.put('/:id', updateExistingImage);
router.delete('/:id', deleteExistingImage);

module.exports = router;