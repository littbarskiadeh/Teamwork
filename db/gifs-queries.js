const os = require('os');
const multer = require('multer');
// const upload = multer({ dest: './db/gifs' });
const upload = multer({ dest: os.tmpdir() });

const conn = require('./db-connection');
const pool = conn.pool;

// let image = './db/gifs/giphy.gif'

const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const gifType = '2';

const getGifs = (request, response) => {
    pool.query('SELECT * FROM posts WHERE type=$1 ORDER BY createddate DESC', [gifType], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const getGifById = async (request, response) => {
    const id = request.params.id;
    
    const commentQuery = 'SELECT * FROM comments WHERE postid=$1';
    const gifsQuery = 'SELECT * FROM posts WHERE type=$1 AND id= $2';

    try {
        console.log(`Running query: ${gifsQuery}`)

        let { rows } = await pool.query(gifsQuery, [gifType,id]);

        if (!rows[0]) {
            return response.status(400).send({ 'message': 'No gif found with the id specified' });
        }

        let gifs = rows;

        //get comments
        console.log(`Running query: ${commentQuery}`)
        let comments = await pool.query(commentQuery, [id]);
        
        console.log(`Comments: ${comments}`)

        comments = comments.rows;
        console.log(`Comments Count ===>> ${comments.length}`)

        //Get required fields for each comment
        function getCommentsData(comm) {
            return { commentId: comm.id, comment:comm.comment, authorId: comm.commenterid };
        }
        const postComments = comments.map(getCommentsData)

        //for each article, attach comments
        function getGIFData(gif) {
            return { id: gif.id, createdon: gif.createddate, title: gif.title, url: gif.description, authorId: gif.ownerid, comments:postComments };
        }
        const data = gifs.map(getGIFData)

        console.log(`Returning article with id ${id}`)
        response.status(201).send({ status: "success", data })        
    }
    catch (error) {
        console.log(`Error: ${error}`)
        return response.status(400).send(error)
    }
}

const createGif = (request, response) => {
    
    const { title } = request.body;
    let imageURL = request.file.path;
    const ownerId = request.user.uuid;
    
    console.log('Creating new GIF for user with id ' + ownerId)

    cloudinary.uploader.upload(imageURL, (error, result) => {
        console.log(`Uploading GIF with title: ${title}`);

        if (!error) {
            console.log("GIF uploaded ");
            console.log(result)

            imageURL = result.url;

            pool.query('INSERT INTO posts (title, description, type, ownerid, createddate,updateddate) VALUES ($1, $2, $3, $4,now(),now()) RETURNING *',
                [title, imageURL, gifType, ownerId], (error, results) => {
                    if (error) {
                        throw error
                    }
                    let result = results.rows[0] ? results.rows[0] : {};

                    console.log(`\nA new GIF has been added. URL: ${result.image}`)
                    // console.log(`A new GIF has been added. URL - ${result.secure_url}`)
                    
                    let data= {
                        message: `GIF image successfully posted`,
                        gifID: result.id,
                        createdOn: result.createddate.toLocaleString(),
                        title: result.title,
                        imageURL: result.image,
                        ownerID: result.ownerid
                    }

                    response.status(201).send({ status: "success", data })
                })
        }
    });
}

const addComment = (request, response) => {
    const { comment } = request.body
    const gifId = parseInt(request.params.id)
    const commenterId = request.user.uuid;

    console.log('Adding new comment from employee with id ' + commenterId)
    console.log('Adding new comment ' + comment)

    pool.query('INSERT INTO comments (comment, postid, commenterid, createddate)  VALUES ($1, $2, $3,now()) RETURNING *',
        [comment, gifId, commenterId], (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0] ? results.rows[0] : {};

            let data = {
                message: `comment successfully added`,
                createdOn: result.createddate.toLocaleString(),
                gifTitle: result.title,
                comment,
                commentBy: commenterId
            }

            console.log(`Comment added, ${comment}`)
            response.status(201).send({ status: "success", data })
            
        })
}

const deleteGif = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
       
        let data= {
            message: `gif post successfully deleted`
        }
        console.log(`GIF with ID: ${id} deleted successfully`)
        response.status(201).send({ status: "success", data })
    })
}

module.exports = {
    getGifs,
    getGifById,
    createGif,
    addComment,
    deleteGif,
    upload
}