const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const posts = require('./routes/posts.routes');
const gifs = require('./routes/gifs.routes');

const users = require('./routes/users.routes');
const auth = require('./routes/auth.routes');

const port = 3000

require('dotenv').config()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use('/auth', auth)
// app.use('/posts', posts)

app.use('/articles', posts)
app.use('/gifs', gifs)

app.use('/users', users)

app.get('/', (request, response) => {
    response.json({ info: 'Teamwork API version1.0'    })
})

app.listen(port, () => { console.log(`App running on port ${port}.`) })

module.exports = app;