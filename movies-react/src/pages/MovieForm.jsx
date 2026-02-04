import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMovie, getMovieById, updateMovie } from "../services/movieService";
import Spinner from "../components/Spinner";

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    release_year: "",
    rating: "",
    poster: null,
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      getMovieById(id).then((res) => {
        setMovieData(res.data);
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
    setLoading(true);

    if (id) await updateMovie(id, movieData);
    else await addMovie(movieData);

    setLoading(false);
    navigate("/");
  };

  if (loading) return <Spinner />;

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5">{id ? "Editar" : "Agregar"} Película</Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Título" name="title" value={movieData.title} onChange={handleChange} required />
        <TextField label="Género" name="genre" value={movieData.genre} onChange={handleChange} required />
        <TextField label="Año" name="release_year" value={movieData.release_year} onChange={handleChange} required />
        <TextField label="Rating" name="rating" value={movieData.rating} onChange={handleChange} required />

        <input type="file" name="poster" onChange={handleChange} />

        <Button variant="contained" type="submit">Guardar</Button>
      </Box>
    </Box>
  );
}
