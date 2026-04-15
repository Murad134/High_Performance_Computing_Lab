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



const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');



router.post('/', verifyToken, verifyAdmin, createAboutProf);
router.get('/', getAboutProf);
router.put('/', verifyToken, verifyAdmin, updateAboutProf);

router.put('/add-interest',verifyToken, verifyAdmin, addInterest);
router.put('/interest/:id', verifyToken, verifyAdmin, updateInterest);
router.delete('/interest/:id', verifyToken, verifyAdmin, deleteInterest);

module.exports = router;
