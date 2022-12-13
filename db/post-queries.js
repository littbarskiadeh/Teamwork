const conn = require('./db-connection');
const pool = conn.pool;

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts WHERE type=$1 ORDER BY createddate DESC',['1'], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const getPostById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const createPost = (request, response) => {
    const { title, description, type } = request.body

    //ADD ownerID to post/article object
    const ownerId = request.user.id;
    console.log('Creating new post for user with id ' + ownerId)

    pool.query('INSERT INTO posts (title, description, type, ownerid,createddate,updateddate) VALUES ($1, $2, $3, $4,now(),now()) RETURNING *',
        [title, description, type, ownerId], (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0] ? results.rows[0] : {};

            console.log('Post added:', result)

            response.status(201).send({ status: "success", data: result })
        })
}

const addComment = (request, response) => {
    const { comment } = request.body
    const articleId = parseInt(request.params.id)
    const commenterId = request.user.id;

    console.log('Adding new comment from employee with id ' + commenterId)
    console.log('Adding new comment ' + comment)

    pool.query('INSERT INTO comments (comment, postid, commenterid, createddate)  VALUES ($1, $2, $3,now()) RETURNING *',
        [comment,articleId,commenterId], (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0] ? results.rows[0] : {};
            
            console.log('Comment added:', result)

            response.status(201).send({ status: "success", data:result })
        })
}

const updatePost = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        title,
        description,
    } = request.body
    pool.query(
        'UPDATE posts SET title = $1, description = $2, updateddate = now() WHERE id = $3 RETURNING *',
        [title, description, id],
        (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0]
            console.log(`Post with id: ${result.id}, has been modified`)

            response.status(201).json(results.rows)

        }
    )
}

const deletePost = (request, response) => {
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
    getPosts,
    getPostById,
    createPost,
    addComment,
    updatePost,
    deletePost,
}