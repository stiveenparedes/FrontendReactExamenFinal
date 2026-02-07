import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useState } from "react";
import Spinner from "../components/Spinner";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseData = await login(
        loginData.username,
        loginData.password
      );

      // 🔐 GUARDAR TOKENS OAUTH2
      localStorage.setItem("access_token", responseData.access_token);
      localStorage.setItem("refresh_token", responseData.refresh_token);

      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      alert("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        margin: "0 auto",
        mt: 8,
      }}
    >
      <Typography variant="h5" textAlign="center">
        🎬 Login Movies
      </Typography>

      <TextField
        label="Usuario"
        name="username"
        value={loginData.username}
        onChange={handleChange}
        required
      />

      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={loginData.password}
        onChange={handleChange}
        required
      />

      <Button variant="contained" type="submit">
        Iniciar Sesión
      </Button>
    </Box>
  );
}
