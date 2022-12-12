let express = require('express');
const router = express.Router();

const User = require('../db/auth-queries');
const Auth = require('../middleware/auth')

router.route('/login').post(User.login)
router.route('/create').post(Auth.verifyToken, Auth.isAdmin, User.create)

module.exports = router;