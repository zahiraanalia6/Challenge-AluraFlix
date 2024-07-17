import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Año:</strong> {movie.year}</p>
      <p><strong>Género:</strong> {movie.genre}</p>
      <p>{movie.description}</p>
      <div>
        <iframe
          title={movie.title}
          width="560"
          height="315"
          src={movie.videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetails;
