const API_URL = "http://localhost:8000/o";

const CLIENT_ID = "QdpJ54zVpbO7VIfODoohrxo7WbC26v3Z6QpX6Wx6";
const CLIENT_SECRET =
  "48x3Py6BxWAFnsVbTKxZ5J2SgDshgpxKFhiYzWMxvDrk9XYlfbtpptsWMY7hhft57zj282tEBAWWY7Y8vcHZ7L6jS4Sg4J25dBaoD3kaH4zJMCwgCVoWFjlZUjaxgRzX";


export async function login(username, password) {
  const response = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "password",
      username,
      password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error("Error en login");
  }

  const data = await response.json();

 
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);

  return data;
}


export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token disponible");
  }

  const response = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo refrescar el token");
  }

  const data = await response.json();

  localStorage.setItem("access_token", data.access_token);

  return data.access_token;
}


export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
