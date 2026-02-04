import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import MovieForm from "./pages/MovieForm";
import DirectorList from "./pages/DirectorList";
import DirectorDetail from "./pages/DirectorDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/add-movie" element={<MovieForm />} />
        <Route path="/edit-movie/:id" element={<MovieForm />} />
        <Route path="/directors" element={<DirectorList />} />
        <Route path="/directors/:id" element={<DirectorDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
