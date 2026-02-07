import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="movie-navbar">
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src="/logo.png" alt="Movie Logo" height={50} />
            <Typography variant="h6">Movie App</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              🎬 Películas
            </Button>

            <Button color="inherit" component={Link} to="/directors">
              🎥 Directores
            </Button>

            {isLoggedIn && (
              <>
                <Button color="inherit" component={Link} to="/directors/add">
                  ➕ Director
                </Button>
                <Button color="inherit" component={Link} to="/movies/add">
                  ➕ Película
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Salir
                </Button>
              </>
            )}

            {!isLoggedIn && (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
}