import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchDirectorById } from "../services/directorService";
import Spinner from "../components/Spinner";

export default function DirectorDetail() {
  const { id } = useParams();
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);

  const mediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;

  useEffect(() => {
    fetchDirectorById(id)
      .then((data) => setDirector(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!director) return <Typography>No encontrado</Typography>;

  const imageUrl =
    director.picture
      ? director.picture.startsWith("http")
        ? director.picture
        : `${mediaUrl}/${director.picture.replace("media/", "")}`
      : null;

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={director.first_name}
          style={{ width: "100%", marginBottom: 16 }}
        />
      )}

      <Typography variant="h4">
        {director.first_name} {director.last_name}
      </Typography>

      <Typography>
        Fecha de nacimiento: {director.birthdate}
      </Typography>
    </Box>
  );
}
