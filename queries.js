const Pool = require('pg').Pool
require('dotenv').config()

const pass = process.env.PASSWORD;
const dbUser = process.env.DBUSER;

const pool = new Pool({
    user: dbUser,
    host: 'localhost',
    database: 'user_db',
    password: pass,
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const {
        name,
        email
    } = request.body
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        let result = results.rows[0] ? results.rows[0]:{};
    
        console.log('User added:', result)

        response.status(201).send({status:"success", data:result})
    })
}


const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        name,
        email
    } = request.body
    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0]
            console.log(`User with id:, ${result.id} has been modified`)

            response.status(201).send(result)

        }
    )
}


const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(`User with ID: ${id} deleted successfully`)
        response.status(200).send(`User with ID: ${id} deleted successfully`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}