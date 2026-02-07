import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { getMovieById } from "../services/movieService";
import { fetchDirectorById } from "../services/directorService";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState(null);

  const mediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;

  useEffect(() => {
    getMovieById(id).then((res) => {
      setMovie(res.data);
      if (res.data.director) {
        fetchDirectorById(res.data.director).then(setDirector);
      }
    });
  }, [id]);

  if (!movie) return <Typography>Cargando...</Typography>;

  const imageUrl = movie.poster
    ? movie.poster.startsWith("http")
      ? movie.poster
      : `${mediaUrl}/${movie.poster.replace("media/", "")}`
    : "";

  return (
    <Card sx={{ maxWidth: 250, margin: "auto" }}>
      {imageUrl && <CardMedia component="img" height="350" image={imageUrl} />}

      <CardContent>
        <Typography variant="h4">{movie.title}</Typography>
        <Typography>🎬 Género: {movie.genre}</Typography>
        <Typography>📅 Año: {movie.release_year}</Typography>
        <Typography>⭐ Rating: {movie.rating}</Typography>

        {director && (
          <Typography sx={{ mt: 1 }}>
            🎥 Director: {director.first_name} {director.last_name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
