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



const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Award images
router.get('/', getAllImages);
router.post('/', verifyToken, verifyAdmin, addNewImages);
router.put('/:id', verifyToken, verifyAdmin, updateExistingImage);
router.delete('/:id', verifyToken, verifyAdmin, deleteExistingImage);

// Welcome images
router.get('/welcome', getWelcomeImages);
router.post('/welcome', verifyToken, verifyAdmin, addNewWelcomeImages);
router.put('/welcome/:id', verifyToken, verifyAdmin, updateWelcomeImage);
router.delete('/welcome/:id', verifyToken, verifyAdmin, deleteWelcomeImage);
module.exports = router;