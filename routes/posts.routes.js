let express = require('express');
const router = express.Router();

const db = require('../db/post-queries');

router.route('/').get(db.getPosts)
router.route('/:id').get(db.getPostById)
router.route('/').post(db.createPost)
router.route('/:id').put(db.updatePost)
router.route('/:id').delete(db.deletePost)

module.exports = router;