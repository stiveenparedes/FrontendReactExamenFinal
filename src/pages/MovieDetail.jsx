import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { getMovieById } from "../services/movieService";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const mediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;

  useEffect(() => {
    getMovieById(id)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <Typography>Cargando...</Typography>;

  let imageUrl = "";
  if (movie.poster) {
    imageUrl = movie.poster.startsWith("http")
      ? movie.poster
      : `${mediaUrl}/${movie.poster.replace("media/", "")}`;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "auto" }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="400"
          image={imageUrl}
          alt={movie.title}
        />
      )}

      <CardContent>
        <Typography variant="h4">{movie.title}</Typography>
        <Typography>🎬 Género: {movie.genre}</Typography>
        <Typography>📅 Año: {movie.release_year}</Typography>
        <Typography>⭐ Rating: {movie.rating}</Typography>
      </CardContent>
    </Card>
  );
}
