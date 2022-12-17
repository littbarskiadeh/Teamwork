let express = require('express');
const router = express.Router();

const db = require('../db/post-queries');
// const Auth = require('../middleware/auth')

router.route('/').get(db.getFeed)

module.exports = router;