import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { fetchMovies, deleteMovie } from "../services/movieService";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    fetchMovies()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results;
        setMovies(data);
      })
      .catch((err) => {
        console.error("Error cargando películas:", err);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteLocal = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      alert("No se pudo eliminar la película");
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        🎬 Películas
      </Typography>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <MovieCard
              movie={movie}
              isLoggedIn={isLoggedIn}
              onDelete={handleDeleteLocal}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
