import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import MovieForm from "./pages/MovieForm";
import DirectorList from "./pages/DirectorList";
import DirectorDetail from "./pages/DirectorDetail";
import LoginPage from "./pages/LoginPage";
import Header from "./components/header";   

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <MovieList />
            </PrivateRoute>
          }
        />

        <Route
          path="/movies/:id"
          element={
            <PrivateRoute>
              <MovieDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-movie"
          element={
            <PrivateRoute>
              <MovieForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-movie/:id"
          element={
            <PrivateRoute>
              <MovieForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/directors"
          element={
            <PrivateRoute>
              <DirectorList />
            </PrivateRoute>
          }
        />

        <Route
          path="/directors/:id"
          element={
            <PrivateRoute>
              <DirectorDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
