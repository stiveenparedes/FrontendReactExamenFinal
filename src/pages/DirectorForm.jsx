import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  addDirector,
  fetchDirectorById,
  updateDirector
} from "../services/directorService";

import Spinner from "../components/Spinner";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function DirectorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    birthdate: "",
    picture: null
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchDirectorById(id)
        .then((res) => setData(res))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "picture" && files[0]) {
      const base64 = await fileToBase64(files[0]);
      setData({ ...data, picture: base64 });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await updateDirector(id, data);
    } else {
      await addDirector(data);
    }

    navigate("/directors");
  };

  if (loading) return <Spinner />;

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        {id ? "Editar Director" : "Agregar Director"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
        <TextField name="first_name" label="Nombre" value={data.first_name} onChange={handleChange} required />
        <TextField name="last_name" label="Apellido" value={data.last_name} onChange={handleChange} required />
        <TextField name="birthdate" type="date" value={data.birthdate} onChange={handleChange} required />
        <input type="file" name="picture" onChange={handleChange} accept="image/*" />
        <Button type="submit" variant="contained">Guardar</Button>
      </Box>
    </Box>
  );
}
