let express = require('express');
const router = express.Router();

const db = require('../db/post-queries');
const Auth = require('../middleware/auth')

//For permissions on Posts, we need to check if:
// logged in user is the owner of the post - for delete, edit functions
// logged in user is an employee or admin

router.route('/').get(Auth.verifyToken, db.getPosts)
router.route('/:id').get(Auth.verifyToken,db.getPostById)

router.route('/:id/comment').post(Auth.verifyToken, db.addComment)
router.route('/create').post(Auth.verifyToken, db.createPost)

// router.route('/:id').put( db.getFeed)

router.route('/:id').patch(Auth.verifyToken, Auth.isPostOwner, db.updatePost)

router.route('/:id').delete(Auth.verifyToken, Auth.isPostOwner, db.deletePost)

module.exports = router;