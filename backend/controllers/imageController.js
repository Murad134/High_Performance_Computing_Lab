const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { addImages, getImages, updateImage, deleteImage } = require('../models/imageModel');

// ✅ SETUP MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// 📌 GET IMAGES
const getAllImages = async (req, res) => {
  try {
    const images = await getImages();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 ADD MULTIPLE IMAGES
const addNewImages = [
  upload.array('images'), // <- important, matches frontend "images"
  async (req, res) => {
    try {
      const { title } = req.body;
      const files = req.files;

      if (!files || files.length === 0) return res.status(400).json({ error: 'No images uploaded' });

      const imagesArray = files.map(file => ({
        title,
        imageUrl: '/uploads/' + file.filename
      }));

      await addImages(imagesArray);
      res.json({ message: 'Images uploaded successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];

// 📌 UPDATE IMAGE
const updateExistingImage = [
  upload.single('image'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { title } = req.body;
      const data = { title };

      if (req.file) {
        data.imageUrl = '/uploads/' + req.file.filename;
      }

      await updateImage(id, data);
      res.json({ message: 'Image updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];

// 📌 DELETE IMAGE
const deleteExistingImage = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteImage(id);
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllImages, addNewImages, updateExistingImage, deleteExistingImage };