const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db/user-queries')
const post = require('./db/post-queries')

const port = 3000

require('dotenv').config()

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres for Teamwork API'
    })
})
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/posts', post.getPosts)
app.get('/posts/:id', post.getPostById)
app.post('/posts', post.createPost)
app.put('/posts/:id', post.updatePost)
app.delete('/posts/:id', post.deletePost)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})