import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { Box } from "@mui/material";

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

  return (
    <Router>
      <Header />

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />

          <Route path="/directors" element={<DirectorList />} />
          <Route path="/directors/:id" element={<DirectorDetail />} />

          <Route path="/login" element={<LoginPage />} />

          {isLoggedIn && (
            <>
              <Route path="/movies/add" element={<MovieForm />} />
              <Route path="/movies/edit/:id" element={<MovieForm />} />
              <Route path="/directors/add" element={<DirectorForm />} />
              <Route path="/edit-director/:id" element={<DirectorForm />} />
            </>
          )}

          <Route
            path="*"
            element={<h2 style={{ textAlign: "center" }}>Página no encontrada</h2>}
          />
        </Routes>
      </Box>
    </Router>
  );
}