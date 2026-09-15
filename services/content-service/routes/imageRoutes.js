const express = require('express');
const router = express.Router();
const {
  getAllImages,
  addNewImages,
  updateExistingImage,
  deleteExistingImage,
  getWelcomeImages,
  addNewWelcomeImages,
  updateWelcomeImage,
  deleteWelcomeImage

} = require('../controllers/imageController');



// Award images
router.get('/', getAllImages);
router.post('/', addNewImages);
router.put('/:id', updateExistingImage);
router.delete('/:id', deleteExistingImage);

// Welcome images
router.get('/welcome', getWelcomeImages);
router.post('/welcome',  addNewWelcomeImages);
router.put('/welcome/:id', updateWelcomeImage);
router.delete('/welcome/:id', deleteWelcomeImage);
module.exports = router;