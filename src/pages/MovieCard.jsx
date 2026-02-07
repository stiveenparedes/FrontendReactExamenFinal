import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDirectorById } from "../services/directorService";

export default function MovieCard({ movie, isLoggedIn, onDelete }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;
  const [director, setDirector] = useState(null);

  useEffect(() => {
    if (movie.director) {
      fetchDirectorById(movie.director).then(setDirector);
    }
  }, [movie.director]);

  const imageUrl = movie.poster
    ? movie.poster.startsWith("http")
      ? movie.poster
      : `${mediaUrl}/${movie.poster.replace("media/", "")}`
    : "";

  return (
    <Card>
      <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        {imageUrl && <CardMedia component="img" height="100" image={imageUrl} />}

        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body2">{movie.genre}</Typography>

          {director && (
            <Typography variant="body2">
              🎥 {director.first_name} {director.last_name}
            </Typography>
          )}
        </CardContent>
      </Link>

      {isLoggedIn && (
        <Box sx={{ display: "flex", gap: 1, p: 1 }}>
          <Button size="small" variant="outlined" component={Link} to={`/movies/edit/${movie.id}`}>
            Editar
          </Button>
          <Button size="small" variant="outlined" color="error" onClick={() => onDelete(movie.id)}>
            Eliminar
          </Button>
        </Box>
      )}
    </Card>
  );
}
