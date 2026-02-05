import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDirectorById } from "../services/directorService";
import { Typography } from "@mui/material";
import Spinner from "../components/Spinner";

export default function DirectorDetail() {
  const { id } = useParams();
  const [director, setDirector] = useState(null);

  useEffect(() => {
    getDirectorById(id).then((res) => setDirector(res.data));
  }, [id]);

  if (!director) return <Spinner />;

  return (
    <>
      <Typography variant="h5">
        {director.first_name} {director.last_name}
      </Typography>
      <Typography>Fecha de nacimiento: {director.birthdate}</Typography>
    </>
  );
}
