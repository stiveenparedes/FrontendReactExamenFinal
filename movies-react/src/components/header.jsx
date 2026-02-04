import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "./Spinner";
import { logout } from "../services/authService";

export default function Header() {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      localStorage.removeItem("access_token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <header className="movie-navbar">
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            
            <img src="/logo.png" alt="Movie Logo" height={60} />
            <Typography variant="h6">Movie App</Typography>
          </Box>

          <Box>
            <Button color="inherit" onClick={() => navigate("/")}>Inicio</Button>

            {isLoggedIn && (
              <>
                <Button color="inherit" onClick={() => navigate("/add-movie")}>
                  Agregar Película
                </Button>
                <Button color="inherit" onClick={() => navigate("/directors")}>
                  Directores
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            )}

            {!isLoggedIn && (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Iniciar Sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
}
