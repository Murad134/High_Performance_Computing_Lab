// const express = require('express');
// const router = express.Router();
// const {
//   getAllImages,
//   addNewImages,
//   updateExistingImage,
//   deleteExistingImage
// } = require('../controllers/imageController');

// router.get('/', getAllImages);
// router.post('/', addNewImages);
// router.put('/:id', updateExistingImage);
// router.delete('/:id', deleteExistingImage);

// module.exports = router;



const express = require('express');
const router = express.Router();
const {
  getAllImages,
  addNewImages,
  updateExistingImage,
  deleteExistingImage,
  getWelcomeImages,
  addNewWelcomeImages,
  deleteWelcomeImage

} = require('../controllers/imageController');

// Award images
router.get('/', getAllImages);
router.post('/', addNewImages);
router.put('/:id', updateExistingImage);
router.delete('/:id', deleteExistingImage);

// Welcome images
router.get('/welcome', getWelcomeImages);
router.post('/welcome', addNewWelcomeImages);
router.delete('/welcome/:id', deleteWelcomeImage);
module.exports = router;