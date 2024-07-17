const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const moviesFilePath = path.join(__dirname, '../data/movies.json');

// Obtener todas las películas
router.get('/', (req, res) => {
  try {
    const moviesData = fs.readFileSync(moviesFilePath);
    const movies = JSON.parse(moviesData);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo las películas');
  }
});

// Agregar una nueva película
router.post('/', (req, res) => {
  try {
    const moviesData = fs.readFileSync(moviesFilePath);
    let movies = JSON.parse(moviesData);

    const newMovie = {
      id: movies.length + 1,
      title: req.body.title,
      description: req.body.description,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
      posterUrl: req.body.posterUrl,
      videoUrl: req.body.videoUrl
    };

    movies.push(newMovie);

    fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));

    res.status(201).json(newMovie);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error agregando la película');
  }
});

// Actualizar una película por ID
router.put('/:id', (req, res) => {
  try {
    const moviesData = fs.readFileSync(moviesFilePath);
    let movies = JSON.parse(moviesData);

    const movieId = parseInt(req.params.id);
    const movieIndex = movies.findIndex(movie => movie.id === movieId);

    if (movieIndex === -1) {
      return res.status(404).send('Película no encontrada');
    }

    movies[movieIndex] = {
      id: movieId,
      title: req.body.title,
      description: req.body.description,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
      posterUrl: req.body.posterUrl,
      videoUrl: req.body.videoUrl
    };

    fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));

    res.json(movies[movieIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error actualizando la película');
  }
});

// Eliminar una película por ID
router.delete('/:id', (req, res) => {
  try {
    const moviesData = fs.readFileSync(moviesFilePath);
    let movies = JSON.parse(moviesData);

    const movieId = parseInt(req.params.id);
    const filteredMovies = movies.filter(movie => movie.id !== movieId);

    if (movies.length === filteredMovies.length) {
      return res.status(404).send('Película no encontrada');
    }

    fs.writeFileSync(moviesFilePath, JSON.stringify(filteredMovies, null, 2));

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error eliminando la película');
  }
});

module.exports = router;
