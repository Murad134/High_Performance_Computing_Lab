// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { addUser, fetchAllUsers, fetchUserById,updateUser } = require('../controllers/userController');

router.post('/', addUser);
router.get('/', fetchAllUsers);
router.get('/:id', fetchUserById);
router.patch('/', updateUser);

module.exports = router;