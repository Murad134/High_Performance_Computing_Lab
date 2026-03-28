// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { addImages, getImages, updateImage, deleteImage } = require('../models/imageModel');

// // ✅ SETUP MULTER
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // 📌 GET IMAGES
// const getAllImages = async (req, res) => {
//   try {
//     const images = await getImages();
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 📌 ADD MULTIPLE IMAGES
// const addNewImages = [
//   upload.array('images'), // <- important, matches frontend "images"
//   async (req, res) => {
//     try {
//       const { title } = req.body;
//       const files = req.files;

//       if (!files || files.length === 0) return res.status(400).json({ error: 'No images uploaded' });

//       const imagesArray = files.map(file => ({
//         title,
//         imageUrl: '/uploads/' + file.filename
//       }));

//       await addImages(imagesArray);
//       res.json({ message: 'Images uploaded successfully' });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// ];

// // 📌 UPDATE IMAGE
// const updateExistingImage = [
//   upload.single('image'),
//   async (req, res) => {
//     try {
//       const id = req.params.id;
//       const { title } = req.body;
//       const data = { title };

//       if (req.file) {
//         data.imageUrl = '/uploads/' + req.file.filename;
//       }

//       await updateImage(id, data);
//       res.json({ message: 'Image updated successfully' });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// ];

// // 📌 DELETE IMAGE
// const deleteExistingImage = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await deleteImage(id);
//     res.json({ message: 'Image deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { getAllImages, addNewImages, updateExistingImage, deleteExistingImage };





const multer = require('multer');
const fs = require('fs');
const { addImages, getImages, updateImage, deleteImage } = require('../models/imageModel');

// ================= MULTER SETUP =================
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

// ================== AWARD IMAGES ==================

// GET ALL AWARD IMAGES
const getAllImages = async (req, res) => {
  try {
    const images = await getImages({ type: 'award' });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD NEW AWARD IMAGES
const addNewImages = [
  upload.array('images'),
  async (req, res) => {
    try {
      const { title } = req.body;
      const files = req.files;

      if (!files || files.length === 0) return res.status(400).json({ error: 'No images uploaded' });

      const imagesArray = files.map(file => ({
        title,
        type: 'award', // mark as award
        imageUrl: '/uploads/' + file.filename
      }));

      await addImages(imagesArray);
      res.json({ message: 'Award images uploaded successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];

// UPDATE AWARD IMAGE
const updateExistingImage = [
  upload.single('image'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { title } = req.body;
      const data = { title };

      if (req.file) data.imageUrl = '/uploads/' + req.file.filename;

      await updateImage(id, data);
      res.json({ message: 'Image updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];

// DELETE AWARD IMAGE
const deleteExistingImage = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteImage(id);
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== WELCOME IMAGES ==================

// GET WELCOME IMAGES
const getWelcomeImages = async (req, res) => {
  try {
    const images = await getImages({ type: 'welcome' });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD NEW WELCOME IMAGES
const addNewWelcomeImages = [
  upload.array('images'),
  async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) return res.status(400).json({ error: 'No images uploaded' });

      const imagesArray = files.map(file => ({
        type: 'welcome',
        imageUrl: '/uploads/' + file.filename
      }));

      await addImages(imagesArray);
      res.json({ message: 'Welcome images uploaded successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];
const deleteWelcomeImage = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteImage(id);
    res.json({ message: 'Welcome image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  getAllImages,
  addNewImages,
  updateExistingImage,
  deleteExistingImage,
  getWelcomeImages,
  addNewWelcomeImages,
  deleteWelcomeImage
};