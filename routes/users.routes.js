let express = require('express');
const router = express.Router();

const db = require('../db/user-queries');

router.route('/').get(db.getUsers)
router.route('/:id').get(db.getUserById)
router.route('/').post(db.createUser)
router.route('/:id').put(db.updateUser)
router.route('/:id').delete(db.deleteUser)

module.exports = router;