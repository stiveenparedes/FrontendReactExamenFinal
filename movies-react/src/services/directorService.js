import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/directors/";

export async function fetchDirectors() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function getDirectorById(id) {
  return axios.get(`${API_URL}${id}/`);
}
