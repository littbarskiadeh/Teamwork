const Pool = require('pg').Pool
require('dotenv').config()

const pass = process.env.PASSWORD;

const pool = new Pool({
    user: 'postgres',
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
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        const result = JSON.stringify(results.rowCount)
        console.log(`User added with ID: ${results.rowCount}`)
        response.status(201).send(`User added successfully ${result}`) //work on returning object in response
    })
}


const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        name,
        email
    } = request.body
    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(`User modified with ID: ${id}`)
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}


const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(`User deleted with ID: ${id}`)
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}