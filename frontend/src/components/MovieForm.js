import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/api/movies/${id}`)
        .then(res => {
          const movie = res.data;
          setTitle(movie.title);
          setDescription(movie.description);
          setDirector(movie.director);
          setYear(movie.year);
          setGenre(movie.genre);
          setPosterUrl(movie.posterUrl);
          setVideoUrl(movie.videoUrl);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      description,
      director,
      year,
      genre,
      posterUrl,
      videoUrl
    };

    if (id) {
      try {
        await axios.put(`/api/movies/${id}`, movieData);
        history.push('/');
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await axios.post('/api/movies', movieData);
        history.push('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Película' : 'Agregar Película'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Título:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label><br />
        <label>Descripción:
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </label><br />
        <label>Director:
          <input type="text" value={director} onChange={e => setDirector(e.target.value)} />
        </label><br />
        <label>Año:
          <input type="number" value={year} onChange={e => setYear(e.target.value)} />
        </label><br />
        <label>Género:
          <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
        </label><br />
        <label>URL del Poster:
          <input type="text" value={posterUrl} onChange={e => setPosterUrl(e.target.value)} />
        </label><br />
        <label>URL del Video:
          <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
        </label><br />
        <button type="submit">{id ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </div>
  );
};

export default MovieForm;
