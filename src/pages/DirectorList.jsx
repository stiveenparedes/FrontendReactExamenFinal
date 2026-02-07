import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import { fetchDirectors, deleteDirector } from "../services/directorService";
import Spinner from "../components/Spinner";
import DirectorCard from "../pages/DirectorCard";

export default function DirectorList() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    fetchDirectors()
      .then((data) => setDirectors(data))
      .catch((err) => console.error("Error cargando directores:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await deleteDirector(id);
    setDirectors((prev) => prev.filter((d) => d.id !== id));
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        🎬 Directores
      </Typography>

      <Grid container spacing={2}>
        {directors.map((director) => (
          <Grid item xs={12} sm={6} md={4} key={director.id}>
            <DirectorCard
              director={director}
              isLoggedIn={isLoggedIn}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
