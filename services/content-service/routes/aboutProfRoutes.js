const express = require('express');
const router = express.Router();
const {
    createAboutProf,
    getAboutProf,
    updateAboutProf,
    addInterest,
    updateInterest,
    deleteInterest
} = require('../controllers/aboutProfController');

router.post('/', createAboutProf);
router.get('/', getAboutProf);
router.put('/', updateAboutProf);

router.put('/add-interest', addInterest);
router.put('/interest/:id',  updateInterest);
router.delete('/interest/:id',  deleteInterest);

module.exports = router;
