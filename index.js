const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// import routes
const posts = require('./routes/posts.routes');
const users = require('./routes/users.routes');

const port = 3000

require('dotenv').config()

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use('/posts', posts)
app.use('/users', users)

app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres for Teamwork API'
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})