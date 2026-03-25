const express = require('express');
const router = express.Router();

const {
    addUser,
    fetchAllUsers,
    fetchUserById,
    updateUser,
    searchUsers,
    changeUserRole,
    getUserRole,
    checkUserExists
} = require('../controllers/userController');

router.post('/', addUser);

router.get('/', fetchAllUsers);

router.get('/search', searchUsers);

// ✅ Check if user exists by email
router.get('/check', checkUserExists);
// ✅ must be before /:id
router.get('/role', getUserRole);

router.patch('/', updateUser);

// dynamic route last
router.get('/:id', fetchUserById);

router.patch('/:id/role', changeUserRole);

module.exports = router;