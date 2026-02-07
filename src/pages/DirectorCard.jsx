import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

export default function DirectorCard({ director, isLoggedIn, onDelete }) {
  const navigate = useNavigate();

  const mediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;

  let imageUrl = "";
  if (director.picture) {
    // EXACTAMENTE igual que movies
    imageUrl = director.picture.startsWith("http")
      ? director.picture
      : `${mediaUrl}/${director.picture.replace("media/", "")}`;
  }

  const handleDelete = () => {
    if (confirm("¿Eliminar este director?")) {
      onDelete(director.id);
    }
  };

  return (
    <Card>
      {imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={imageUrl}
          alt={director.first_name}
        />
      )}

      <CardContent>
        <Typography variant="h6">
          {director.first_name} {director.last_name}
        </Typography>
        <Typography variant="body2">
          Fecha de nacimiento: {director.birthdate}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", gap: 1 }}>
        <IconButton
          onClick={() => navigate(`/directors/${director.id}`)}
          sx={{ backgroundColor: "#1976d2", color: "white" }}
        >
          <VisibilityIcon />
        </IconButton>

        {isLoggedIn && (
          <>
            <IconButton
              onClick={() => navigate(`/edit-director/${director.id}`)}
              sx={{ backgroundColor: "#2e7d32", color: "white" }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={handleDelete}
              sx={{ backgroundColor: "#d32f2f", color: "white" }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
