const conn = require('./db-connection');
const pool = conn.pool;

let image = './db/gifs/giphy.gif'

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

const getGifById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM posts WHERE type=$1 id = $2', [gifType, id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const createGif = (request, response) => {
    // let imageURL = image;
    let imageURL;
    const { title } = request.body

    if (request.body.image) { imageURL = request.body.image }

    const ownerId = request.user.id;
    console.log('Creating new GIF for user with id ' + ownerId)

    cloudinary.uploader.upload(image, (error, result) => {
        console.log(`Uploading image with title: ${title}`);

        if (!error) {
            console.log("Image uploaded ");
            console.log(result)

            imageURL = result.url;

            pool.query('INSERT INTO posts (title, image, type, ownerid,createddate,updateddate) VALUES ($1, $2, $3, $4,now(),now()) RETURNING *',
                [title, imageURL, gifType, ownerId], (error, results) => {
                    if (error) {
                        throw error
                    }
                    let result = results.rows[0] ? results.rows[0] : {};

                    console.log(`\nA new GIF has been added. URL: ${result.image}`)
                    // console.log('A new GIF has been added. URL: ', result.secure_url)

                    response.status(201).send({ status: "success", data: result })
                })
        }
    });
}

const addComment = (request, response) => {
    const { comment } = request.body
    const gifId = parseInt(request.params.id)
    const commenterId = request.user.id;

    console.log('Adding new comment from employee with id ' + commenterId)
    console.log('Adding new comment ' + comment)

    pool.query('INSERT INTO comments (comment, postid, commenterid, updateddate)  VALUES ($1, $2, $3,now()) RETURNING *',
        [comment, gifId, commenterId], (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0] ? results.rows[0] : {};

            console.log('Comment added:', result)

            response.status(201).send({ status: "success", data: result })
        })
}

const deleteGif = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(`Post with ID: ${id} deleted successfully`)
        response.status(200).send(`Post with ID ${id} deleted successfully`)
    })
}

module.exports = {
    getGifs,
    getGifById,
    createGif,
    addComment,
    deleteGif,
}