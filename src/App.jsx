import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import MovieList from "./pages/MovieList";
import MovieForm from "./pages/MovieForm";
import MovieDetail from "./pages/MovieDetail";

import Header from "./components/header";
import DirectorList from "./pages/DirectorList";
import DirectorDetail from "./pages/DirectorDetail";
import DirectorForm from "./pages/DirectorForm";

import LoginPage from "./pages/LoginPage";

export default function App() {
  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Router>
      {/* ===== NAVBAR ===== */}
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            🎬 Películas
          </Button>

          <Button color="inherit" component={Link} to="/directors">
            🎥 Directores
          </Button>

          {/* BOTÓN SOLO PARA DIRECTORES (LOGUEADO) */}
          {isLoggedIn && (
            <Button color="inherit" component={Link} to="/directors/add">
              ➕ Director
            </Button>
          )}

          {isLoggedIn && (
            <Button color="inherit" component={Link} to="/movies/add">
              ➕ Pelicula
            </Button>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Salir
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* ===== ROUTES ===== */}
      <Box sx={{ p: 3 }}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />

          <Route path="/directors" element={<DirectorList />} />
          <Route path="/directors/:id" element={<DirectorDetail />} />

          <Route path="/login" element={<LoginPage />} />

          {/* PROTECTED (UI level) */}
          {isLoggedIn && (
            <>
              {/* PELÍCULAS */}
              <Route path="/movies/add" element={<MovieForm />} />
              <Route path="/movies/edit/:id" element={<MovieForm />} />

              {/* DIRECTORES */}
              <Route path="/directors/add" element={<DirectorForm />} />
              <Route
                path="/edit-director/:id"
                element={<DirectorForm />}
              />
            </>
          )}

          {/* FALLBACK */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center" }}>
                Página no encontrada
              </h2>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}
