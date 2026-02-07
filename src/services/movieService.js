import api from "./api";

export const fetchMovies = () => {
  return api.get("/api/movies/");
};

export const getMovieById = (id) => {
  return api.get(`/api/movies/${id}/`);
};

export const addMovie = (data) => {
  return api.post("/api/movies/", data);
};

export const updateMovie = (id, data) => {
  return api.put(`/api/movies/${id}/`, data);
};

export const deleteMovie = (id) => {
  return api.delete(`/api/movies/${id}/`);
};
