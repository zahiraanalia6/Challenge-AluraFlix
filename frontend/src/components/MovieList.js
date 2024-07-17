import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Películas</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <a href={`/details/${movie.id}`}>{movie.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
