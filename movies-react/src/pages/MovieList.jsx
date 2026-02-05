import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { fetchMovies, deleteMovie } from "../services/movieService";
import Spinner from "../components/Spinner";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies()
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results;

        setMovies(data);
      })
      .catch((err) => {
        console.error("Error cargando películas:", err);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar esta película?"
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      alert("No se pudo eliminar la película");
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🎬 Películas
      </Typography>

      {movies.length === 0 && (
        <Typography>No hay películas registradas</Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 2,
        }}
      >
        {movies.map((movie) => (
          <Card key={movie.id}>
            <CardContent>
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="body2">Género: {movie.genre}</Typography>
              <Typography variant="body2">Año: {movie.release_year}</Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                Ver
              </Button>

              <Button
                size="small"
                onClick={() => navigate(`/edit-movie/${movie.id}`)}
              >
                Editar
              </Button>

              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(movie.id)}
              >
                Eliminar
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
