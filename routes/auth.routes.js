let express = require('express');
const router = express.Router();

const db = require('../db/user-queries');

router.route('/logout/:username').get(db.logout)
router.route('/login/:username').get(db.login)
router.route('/signup').get(db.createUser)

// router.route('/:id').put(db.updateUser)

module.exports = router;