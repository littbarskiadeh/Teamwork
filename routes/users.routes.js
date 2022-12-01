let express = require('express');
const router = express.Router();

const db = require('../db/user-queries');

const Auth = require('../middleware/auth')

router.route('/').get(Auth.verifyToken, db.getUsers)
router.route('/:id').put(Auth.isAdmin, db.updateUser)

// router.route('/:id').delete(db.deleteUser)
// router.route('/').post(db.createUser)


//protect route - ONLY SUPER ADMIN
router.route('/').delete(db.deleteAllUsers)

module.exports = router;