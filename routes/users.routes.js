let express = require('express');
const router = express.Router();

const db = require('../db/user-queries');

router.route('/').get(db.getUsers)
router.route('/:id').put(db.updateUser)
router.route('/:id').delete(db.deleteUser)
router.route('/').post(db.createUser)


//protect route - ONLY SUPER ADMIN
router.route('/').delete(db.deleteAllUsers)

module.exports = router;