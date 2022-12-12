let express = require('express');
const router = express.Router();

const db = require('../db/user-queries');
const Auth = require('../middleware/auth')

router.route('/').get(Auth.verifyToken, db.getUsers)
router.route('/:id').put(Auth.verifyToken, Auth.isAdmin, db.updateUser)

router.route('/:id').delete(Auth.verifyToken, Auth.isAdmin,  db.deleteUser)
// router.route('/').post(Auth.verifyToken, Auth.isAdmin,  db.createUser)

//protect route - ONLY SUPER ADMIN
router.route('/').delete(Auth.verifyToken, Auth.isAdmin, db.deleteAllUsers)

module.exports = router;