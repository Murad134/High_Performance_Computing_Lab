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
async function postOrUpdateHome(req, res) {
  try {
    // Make sure req.body exists
    if (!req.body) {
      return res.status(400).json({ success: false, message: 'No data sent' });
    }

    const homeData = {
      welcomeTitle: req.body.welcomeTitle || "",
      welcomeSubtitle: req.body.welcomeSubtitle || "",
      aboutTitle: req.body.aboutTitle || "",
      aboutDescription: req.body.aboutDescription || "",
      aboutButtonName: req.body.aboutButtonName || "",
      aboutButtonLink: req.body.aboutButtonLink || "",
    };

    // upsert: true will create if not exists, update if exists
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
}

module.exports = { getHome, postOrUpdateHome };