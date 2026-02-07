import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <header className="movie-navbar">
      <AppBar position="static">
        {/* ===== IMAGEN SUPERIOR CENTRADA ===== */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
            backgroundColor: "#1976d2",
          }}
        >
          <img
            src="/pelis.jpg"
            alt="Películas"
            style={{
              maxHeight: "120px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* ===== NAVBAR ===== */}
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <img src="/logo.png" alt="Movie Logo" height={50} />
            <Typography variant="h6">Movie App</Typography>
          </Box>

          <Box>
            <Button color="inherit" onClick={() => navigate("/")}>
              Inicio
            </Button>

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
