import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

console.log("MEDIA:", import.meta.env.VITE_MEDIA_BASE_URL);
console.log("API:", import.meta.env.VITE_API_BASE_URL);

export default function MovieCard({ movie, isLoggedIn, onDelete }) {
    const navigate = useNavigate();

    const mediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;

    let imageUrl = "";
    if (movie.poster) {
        if (movie.poster.startsWith("http")) {
            imageUrl = movie.poster;
        } else if (movie.poster.startsWith("/")) {
            imageUrl = `http://127.0.0.1:8000${movie.poster}`;
        } else {
            imageUrl = `${mediaUrl}/${movie.poster}`;
        }
    }

    const handleDelete = () => {
        if (confirm("¿Eliminar esta película?")) {
            onDelete(movie.id);
        }
    };

    return (
        <Card>
            {imageUrl && (
                <CardMedia
                    component="img"
                    height="300"
                    image={imageUrl}
                    alt={movie.title}
                />
            )}


            <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">Género: {movie.genre}</Typography>
                <Typography variant="body2">Año: {movie.release_year}</Typography>
                <Typography variant="body2">Rating: {movie.rating}</Typography>
            </CardContent>

            <CardActions
                sx={{ display: "flex", justifyContent: "center", gap: 1 }}
            >
                <IconButton
                    onClick={() => navigate(`/movies/${movie.id}`)}
                    sx={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        "&:hover": { backgroundColor: "#115293" },
                    }}
                >
                    <VisibilityIcon />
                </IconButton>

                {isLoggedIn && (
                    <>
                        <IconButton
                            onClick={() => navigate(`/movies/edit/${movie.id}`)}
                            sx={{
                                backgroundColor: "#2e7d32",
                                color: "white",
                                "&:hover": { backgroundColor: "#1b5e20" },
                            }}
                        >
                            <EditIcon />
                        </IconButton>

                        <IconButton
                            onClick={handleDelete}
                            sx={{
                                backgroundColor: "#d32f2f",
                                color: "white",
                                "&:hover": { backgroundColor: "#9a0007" },
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </CardActions>
        </Card>
    );
}
