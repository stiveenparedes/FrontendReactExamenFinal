import { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardActions, CardMedia, Typography, Button } from "@mui/material";
import { fetchMovies, deleteMovie } from "../services/movieService";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const API_BASE = "http://localhost:8000"; 

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    fetchMovies()
      .then((data) => setMovies(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await deleteMovie(id);
    setMovies(movies.filter((m) => m.id !== id));
  };

  if (loading) return <Spinner />;

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              boxShadow: 4,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            {/* Imagen */}
            <CardMedia
              component="img"
              height="300"
              image={
                movie.poster
                  ? `${API_BASE}/media/${movie.poster}`
                  : "https://via.placeholder.com/300x450?text=Sin+Imagen"
              }
              alt={movie.title}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {movie.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                🎬 Director ID: {movie.director}
              </Typography>

              <Typography variant="body2">🎭 Género: {movie.genre}</Typography>
              <Typography variant="body2">📅 Año: {movie.release_year}</Typography>
              <Typography variant="body2">⭐ Rating: {movie.rating}</Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
              <Button size="small" onClick={() => navigate(`/movies/${movie.id}`)}>
                Ver
              </Button>

              {isLoggedIn && (
                <div>
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
                </div>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
