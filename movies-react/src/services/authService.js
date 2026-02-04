import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export async function login(username, password) {
  const response = await axios.post(`${API_URL}/o/token/`, {
    username,
    password,
    grant_type: "password",
    client_id: "TU_CLIENT_ID",
    client_secret: "TU_CLIENT_SECRET",
  });
  return response.data;
}

export function logout() {
  localStorage.removeItem("access_token");
}
