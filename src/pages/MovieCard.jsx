import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, isLoggedIn, onDelete }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;

  let imageUrl = "";
  if (movie.poster) {
    imageUrl = movie.poster.startsWith("http")
      ? movie.poster
      : `${mediaUrl}/${movie.poster.replace("media/", "")}`;
  }

  return (
    <Card>
      {/* ===== VER DETALLE ===== */}
      <Link
        to={`/movies/${movie.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {imageUrl && (
          <CardMedia
            component="img"
            height="250"
            image={imageUrl}
            alt={movie.title}
          />
        )}

        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body2">{movie.genre}</Typography>
        </CardContent>
      </Link>

      {/* ===== BOTONES SOLO SI ESTÁ LOGUEADO ===== */}
      {isLoggedIn && (
        <Box sx={{ display: "flex", gap: 1, p: 1 }}>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to={`/movies/edit/${movie.id}`}
          >
            Editar
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => onDelete(movie.id)}
          >
            Eliminar
          </Button>
        </Box>
      )}
    </Card>
  );
}
