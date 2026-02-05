import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  addMovie,
  getMovieById,
  updateMovie
} from "../services/movieService";

import Spinner from "../components/Spinner";

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    release_year: "",
    rating: "",
    poster: null
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getMovieById(id)
        .then((res) => {
          setMovieData({
            title: res.data.title,
            genre: res.data.genre,
            release_year: res.data.release_year,
            rating: res.data.rating,
            poster: res.data.poster
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "poster") {
      setMovieData({ ...movieData, poster: files[0] });
    } else {
      setMovieData({ ...movieData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (id) {
        await updateMovie(id, movieData);
        alert("Película actualizada correctamente");
      } else {
        await addMovie(movieData);
        alert("Película agregada correctamente");
      }

      navigate("/");
    } catch (error) {
      console.error("Error guardando película:", error);
      alert("Error al guardar la película");
    } finally {
      setSaving(false);
    }
  };

  if (loading || saving) {
    return <Spinner />;
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Editar Película" : "Agregar Película"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <TextField
          label="Título"
          name="title"
          value={movieData.title}
          onChange={handleChange}
          required
        />

        <TextField
          label="Género"
          name="genre"
          value={movieData.genre}
          onChange={handleChange}
          required
        />

        <TextField
          label="Año de estreno"
          name="release_year"
          value={movieData.release_year}
          onChange={handleChange}
          required
        />

        <TextField
          label="Rating"
          name="rating"
          value={movieData.rating}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="poster"
          onChange={handleChange}
          accept="image/*"
        />

        <Button
          variant="contained"
          type="submit"
          disabled={saving}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
}
