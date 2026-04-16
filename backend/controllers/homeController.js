// const { findHome, updateHome } = require('../models/homeModel');
// // GET home data
// async function getHome(req, res) {
//     try {
//         const data = await findHome();
//         res.json(data || {});
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// }

// // PATCH update home data
// async function updateHomeController(req, res) {
//     try {
//         const homeData = {
//             welcomeTitle: req.body.welcomeTitle || "",
//             welcomeSubtitle: req.body.welcomeSubtitle || "",
//             aboutTitle: req.body.aboutTitle || "",
//             aboutDescription: req.body.aboutDescription || "",
//             aboutButtonName: req.body.aboutButtonName || "",
//             aboutButtonLink: req.body.aboutButtonLink || "",
//         };
//         await updateHome(homeData);
//         res.json({ success: true, data: homeData });
//     } catch (err) {
//         console.error("PATCH HOME ERROR:", err);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// }
// module.exports = { getHome, updateHomeController };

const { findHome, updateHome } = require('../models/homeModel');
const { upload, cloudinary } = require('../config/cloudinary');

const getPublicIdFromUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  if (uploadIndex === -1) return null;

  const publicIdParts = [];
  for (let i = uploadIndex + 1; i < parts.length; i++) {
    if (parts[i].startsWith('v') && /^\d+$/.test(parts[i].slice(1))) {
      continue;
    }
    publicIdParts.push(parts[i]);
  }

  if (publicIdParts.length === 0) return null;
  const lastPart = publicIdParts[publicIdParts.length - 1];
  publicIdParts[publicIdParts.length - 1] = lastPart.replace(/\.[^/.]+$/, '');
  return publicIdParts.join('/');
};

// GET home data
async function getHome(req, res) {
  try {
    const data = await findHome();
    res.json(data || {}); // return empty object if no data
  } catch (err) {
    console.error('GET HOME ERROR:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// POST or PATCH home data (upsert)
const postOrUpdateHome = [
  upload.fields([
    { name: 'welcomeImage', maxCount: 1 },
    { name: 'aboutImage', maxCount: 1 },
  ]),
  async function (req, res) {
    try {
      const currentHome = (await findHome()) || {};
      const files = req.files || {};

      const homeData = {
        welcomeTitle: req.body?.welcomeTitle ?? currentHome.welcomeTitle ?? '',
        welcomeSubtitle: req.body?.welcomeSubtitle ?? currentHome.welcomeSubtitle ?? '',
        aboutTitle: req.body?.aboutTitle ?? currentHome.aboutTitle ?? '',
        aboutDescription: req.body?.aboutDescription ?? currentHome.aboutDescription ?? '',
        aboutButtonName: req.body?.aboutButtonName ?? currentHome.aboutButtonName ?? '',
        aboutButtonLink: req.body?.aboutButtonLink ?? currentHome.aboutButtonLink ?? '',
        welcomeImage: currentHome.welcomeImage || '',
        aboutImage: currentHome.aboutImage || '',
      };

      if (typeof req.body?.welcomeImage === 'string' && req.body.welcomeImage.trim()) {
        const nextWelcomeImage = req.body.welcomeImage.trim();
        if (currentHome.welcomeImage && currentHome.welcomeImage !== nextWelcomeImage) {
          const oldWelcomePublicId = getPublicIdFromUrl(currentHome.welcomeImage);
          if (oldWelcomePublicId) {
            await cloudinary.uploader.destroy(oldWelcomePublicId);
          }
        }
        homeData.welcomeImage = nextWelcomeImage;
      }

      if (typeof req.body?.aboutImage === 'string' && req.body.aboutImage.trim()) {
        const nextAboutImage = req.body.aboutImage.trim();
        if (currentHome.aboutImage && currentHome.aboutImage !== nextAboutImage) {
          const oldAboutPublicId = getPublicIdFromUrl(currentHome.aboutImage);
          if (oldAboutPublicId) {
            await cloudinary.uploader.destroy(oldAboutPublicId);
          }
        }
        homeData.aboutImage = nextAboutImage;
      }

      if (files.welcomeImage?.[0]?.path) {
        if (currentHome.welcomeImage) {
          const oldWelcomePublicId = getPublicIdFromUrl(currentHome.welcomeImage);
          if (oldWelcomePublicId) {
            await cloudinary.uploader.destroy(oldWelcomePublicId);
          }
        }
        homeData.welcomeImage = files.welcomeImage[0].path;
      }

      if (files.aboutImage?.[0]?.path) {
        if (currentHome.aboutImage) {
          const oldAboutPublicId = getPublicIdFromUrl(currentHome.aboutImage);
          if (oldAboutPublicId) {
            await cloudinary.uploader.destroy(oldAboutPublicId);
          }
        }
        homeData.aboutImage = files.aboutImage[0].path;
      }

      await updateHome(homeData);

      res.json({
        success: true,
        message: 'Home page saved successfully!',
        data: homeData,
      });
    } catch (err) {
      console.error('POST/UPDATE HOME ERROR:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
];

module.exports = { getHome, postOrUpdateHome };