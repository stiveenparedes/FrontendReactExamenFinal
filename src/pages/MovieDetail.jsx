import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { getMovieById } from "../services/movieService";
import Spinner from "../components/Spinner";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieById(id).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) return <Spinner />;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h5">{movie.title}</Typography>
          <Typography>Género: {movie.genre}</Typography>
          <Typography>Año: {movie.release_year}</Typography>
          <Typography>Rating: {movie.rating}</Typography>

          <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate(-1)}>
            Regresar
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
