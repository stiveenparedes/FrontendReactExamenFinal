import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/movies/";

function authHeader() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchMovies() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function getMovieById(id) {
  return axios.get(`${API_URL}${id}/`);
}

export async function addMovie(data) {
  const formData = new FormData();
  Object.keys(data).forEach((k) => formData.append(k, data[k]));

  return axios.post(API_URL, formData, {
    headers: { ...authHeader() },
  });
}

export async function updateMovie(id, data) {
  const formData = new FormData();
  Object.keys(data).forEach((k) => formData.append(k, data[k]));

  return axios.put(`${API_URL}${id}/`, formData, {
    headers: { ...authHeader() },
  });
}

export async function deleteMovie(id) {
  return axios.delete(`${API_URL}${id}/`, {
    headers: { ...authHeader() },
  });
}
