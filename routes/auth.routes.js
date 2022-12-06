let express = require('express');
const router = express.Router();

// const db = require('../db/user-queries');
const User = require('../db/auth-queries');


// router.route('/logout').get(User.logout)
router.route('/login').post(User.login)
router.route('/signup').post(User.create)

// router.route('/:id').put(db.updateUser)

module.exports = router;