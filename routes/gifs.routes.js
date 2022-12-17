let express = require('express');
const router = express.Router();

const db = require('../db/gifs-queries');
const Auth = require('../middleware/auth')

//For permissions on Posts, we need to check if:
// logged in user is the owner of the post - for delete, edit functions
// logged in user is an employee or admin

router.route('/').get(Auth.verifyToken, db.getGifs)
router.route('/:id').get(Auth.verifyToken,db.getGifById)

router.route('/:id/comment').post(Auth.verifyToken, db.addComment)
router.route('/').post(Auth.verifyToken, db.upload.single('file'), db.createGif) //file is the fieldname for the file uploaded

router.route('/:id').delete(Auth.verifyToken, Auth.isPostOwner, db.deleteGif)

module.exports = router;