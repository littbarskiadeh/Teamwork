const conn = require('./db-connection');
const pool = conn.pool;

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
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
    const {
        name,
        email
    } = request.body
    pool.query('INSERT INTO posts (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        let result = results.rows[0] ? results.rows[0]:{};
    
        console.log('Post added:', result)

        response.status(201).send({status:"success", data:result})
    })
}


const updatePost = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        name,
        email
    } = request.body
    pool.query(
        'UPDATE posts SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0]
            console.log(`Post with id ${result.id} has been modified`)

            response.status(201).json( results.rows)

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
    updatePost,
    deletePost,
}