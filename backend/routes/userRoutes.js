// const express = require('express');
// const router = express.Router();

// const {
//     addUser,
//     fetchAllUsers,
//     fetchUserById,
//     updateUser,
//     searchUsers,
//     changeUserRole,
//     getUserRole,
//     checkUserExists
// } = require('../controllers/userController');

// router.post('/', addUser);

// router.get('/', fetchAllUsers);

// router.get('/search', searchUsers);

// // ✅ Check if user exists by email
// router.get('/check', checkUserExists);
// // ✅ must be before /:id
// router.get('/role', getUserRole);

// router.patch('/', updateUser);

// // dynamic route last
// router.get('/:id', fetchUserById);

// router.patch('/:id/role', changeUserRole);

// module.exports = router;






const express = require('express');
const router = express.Router();




const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const verifySuperAdmin = require('../middleware/verifySuperadmin');


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

router.get('/',verifyToken,verifyAdmin, fetchAllUsers);

router.get('/search',verifyToken,verifyAdmin, searchUsers);

// ✅ Check if user exists by email
router.get('/check',verifyToken, checkUserExists);
// ✅ must be before /:id
router.get('/role',verifyToken, getUserRole);

router.patch('/',verifyToken,verifyAdmin, updateUser);

// dynamic route last
router.get('/:id',verifyToken,verifyAdmin, fetchUserById);

router.patch('/:id/role', verifyToken, verifyAdmin,verifySuperAdmin, changeUserRole);

module.exports = router;