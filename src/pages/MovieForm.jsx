import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  addMovie,
  getMovieById,
  updateMovie
} from "../services/movieService";

import { fetchDirectors } from "../services/directorService";
import Spinner from "../components/Spinner";


const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    release_year: "",
    rating: "",
    poster: null,
    director: ""
  });

  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDirectors().then(setDirectors);

    if (id) {
      setLoading(true);
      getMovieById(id)
        .then((res) => {
          setMovieData({
            title: res.data.title,
            genre: res.data.genre,
            release_year: res.data.release_year,
            rating: res.data.rating,
            poster: res.data.poster,
            director: res.data.director || ""
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "poster" && files && files[0]) {
      const base64 = await fileToBase64(files[0]);
      setMovieData({ ...movieData, poster: base64 });
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
      alert(JSON.stringify(error.response?.data, null, 2));
    } finally {
      setSaving(false);
    }
  };

  if (loading || saving) return <Spinner />;

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Editar Película" : "Agregar Película"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Título"
          name="title"
          value={movieData.title}
          onChange={handleChange}
          required
        />

        <FormControl required>
          <InputLabel>Género</InputLabel>
          <Select
            name="genre"
            value={movieData.genre}
            label="Género"
            onChange={handleChange}
          >
            <MenuItem value="Acción">🎬 Acción</MenuItem>
            <MenuItem value="Drama">🎭 Drama</MenuItem>
            <MenuItem value="Comedia">😂 Comedia</MenuItem>
            <MenuItem value="Terror">😱 Terror</MenuItem>
            <MenuItem value="Ciencia Ficción">🚀 Ciencia Ficción</MenuItem>
          </Select>
        </FormControl>

        
        <FormControl>
          <InputLabel>Director</InputLabel>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Select
              name="director"
              value={movieData.director}
              onChange={handleChange}
              sx={{ flex: 1 }}
            >
              {directors.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.first_name} {d.last_name}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="outlined"
              onClick={() => navigate("/directors/add")} 
              sx={{ whiteSpace: "nowrap" }}
            >
              + Director
            </Button>
          </Box>
        </FormControl>

        <TextField
          label="Año de estreno"
          name="release_year"
          type="number"
          value={movieData.release_year}
          onChange={handleChange}
          required
        />
        <TextField
          label="Rating"
          name="rating"
          type="number"
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

        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </Box>
    </Box>
  );
}
