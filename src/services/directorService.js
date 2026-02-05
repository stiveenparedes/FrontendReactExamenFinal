import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/directors/";

function authHeader() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Token ${token}` } : {};
}

export async function fetchDirectors() {
  return axios.get(API_URL, { headers: authHeader() });
}

export async function getDirectorById(id) {
  return axios.get(`${API_URL}${id}/`, { headers: authHeader() });
}
