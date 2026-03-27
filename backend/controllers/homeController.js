const { findHome, updateHome } = require('../models/homeModel');
const fs = require('fs');
const path = require('path');

// GET home data
async function getHome(req, res) {
    try {
        const data = await findHome();
        res.json(data || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// POST / Update home data
// async function postHome(req, res) {
//     try {
//         // new uploaded images
//         const uploadedImages = req.files ? req.files.map(f => f.filename) : [];

//         // existing images sent from frontend (after removing any)
//         let existingImagesFromFrontend = req.body.existingImages || [];

//         // FIX: handle string, undefined, empty properly
//         if (!existingImagesFromFrontend) {
//             existingImagesFromFrontend = [];
//         } else if (!Array.isArray(existingImagesFromFrontend)) {
//             existingImagesFromFrontend = [existingImagesFromFrontend];
//         }

//         // remove empty values
//         existingImagesFromFrontend = existingImagesFromFrontend.filter(Boolean);

//         // fetch current DB to remove physically deleted images
//         const existingDoc = await findHome();
//         const currentImages = existingDoc?.welcomeImages || [];
//         const imagesToDelete = currentImages.filter(img => !existingImagesFromFrontend.includes(img));
//         imagesToDelete.forEach(img => {
//             const filePath = path.join(__dirname, '..', 'uploads', img);
//             if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//         });

//         const welcomeImages = [...existingImagesFromFrontend, ...uploadedImages];

//         const homeData = {
//             welcomeTitle: req.body.welcomeTitle,
//             welcomeSubtitle: req.body.welcomeSubtitle,
//             welcomeButtonName: req.body.welcomeButtonName,
//             welcomeButtonLink: req.body.welcomeButtonLink,
//             aboutTitle: req.body.aboutTitle,
//             aboutDescription: req.body.aboutDescription,
//             aboutButtonName: req.body.aboutButtonName,
//             aboutButtonLink: req.body.aboutButtonLink,
//             welcomeImages,
//         };

//         await updateHome(homeData);
//         res.json({ success: true, data: homeData });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// }

async function postHome(req, res) {
    try {
        console.log("FILES:", req.files);
        console.log("BODY:", req.body);

        // new uploaded images
        const uploadedImages = req.files ? req.files.map(f => f.filename) : [];

        // existing images from frontend
        let existingImagesFromFrontend = req.body.existingImages || [];

        if (!existingImagesFromFrontend) {
            existingImagesFromFrontend = [];
        } else if (!Array.isArray(existingImagesFromFrontend)) {
            existingImagesFromFrontend = [existingImagesFromFrontend];
        }

        // remove empty values
        existingImagesFromFrontend = existingImagesFromFrontend.filter(Boolean);

        // get current DB images
        const existingDoc = await findHome();
        const currentImages = existingDoc?.welcomeImages || [];

        // delete removed images from server
        const imagesToDelete = currentImages.filter(
            img => !existingImagesFromFrontend.includes(img)
        );

        imagesToDelete.forEach(img => {
            const filePath = path.join(__dirname, '..', 'uploads', img);
            try {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            } catch (err) {
                console.error("File delete error:", err);
            }
        });

        // final images
        const welcomeImages = [...existingImagesFromFrontend, ...uploadedImages];

        const homeData = {
            welcomeTitle: req.body.welcomeTitle,
            welcomeSubtitle: req.body.welcomeSubtitle,
            welcomeButtonName: req.body.welcomeButtonName,
            welcomeButtonLink: req.body.welcomeButtonLink,
            aboutTitle: req.body.aboutTitle,
            aboutDescription: req.body.aboutDescription,
            aboutButtonName: req.body.aboutButtonName,
            aboutButtonLink: req.body.aboutButtonLink,
            welcomeImages,
        };

        await updateHome(homeData);

        res.json({
            success: true,
            data: homeData
        });

    } catch (err) {
        console.error("POST HOME ERROR:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
// DELETE single image
async function deleteImage(req, res) {
    try {
        const { filename } = req.params;
        const existingDoc = await findHome();

        if (!existingDoc?.welcomeImages.includes(filename)) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        // Remove image from DB
        const updatedImages = existingDoc.welcomeImages.filter(img => img !== filename);
        await updateHome({ ...existingDoc, welcomeImages: updatedImages });

        // Delete file physically
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        res.json({ success: true, message: 'Image removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = { getHome, postHome, deleteImage };