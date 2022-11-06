// const Joi = require('joi'); //npm install joi@13.1.0
const express = require('express');
const app = express();

app.use(express.json());

// List of Genres for movies
const genres = [
    {id: 1, name: 'Action'}, 
    {id: 2, name: 'Thriller'}, 
    {id: 3, name: 'Drama'}, 
    {id: 4, name: 'Romance'}
];

app.get('/', (req, res) => {
    res.send('Home')
});

//get all genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

//get genre by id
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');
    res.send(genre);
});

//create new genre
app.post('/api/genres/:name', (req, res) => {
    const genre = {
        id: genres.length + 1,
        name: req.params.name
    };
    genres.push(genre);
    res.send(genre);
});

//update genre
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');

    genre.name = req.body.name;
    res.send(genre);
});

// delete genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given id not found');
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1); //Array Delete
        
    res.send(genre);
});


app.listen(8080, () => {
    console.log('Listening on port 8080');
});