const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const cors = require('cors');

const posts = require('./routes/posts.routes');
const gifs = require('./routes/gifs.routes');
const feed = require('./routes/feeds.routes');

const users = require('./routes/users.routes');
const auth = require('./routes/auth.routes');

const port = process.env.PORT || 8090;

require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)

app.use('/auth', auth)

app.use('/articles', posts)
app.use('/gifs', gifs)
app.use('/feed', feed)
app.use('/users', users)

app.get('/', (request, response) => {
    response.json({ info: `Teamwork API version1.0` })
})

app.listen(port, "0.0.0.0", () => { console.log(`App running on port ${port}.`) })

module.exports = app;