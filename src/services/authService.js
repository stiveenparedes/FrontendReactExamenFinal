const API_URL = "http://localhost:8000/o";

const CLIENT_ID = "QdpJ54zVpbO7VIfODoohrxo7WbC26v3Z6QpX6Wx6";
const CLIENT_SECRET = "48x3Py6BxWAFnsVbTKxZ5J2SgDshgpxKFhiYzWMxvDrk9XYlfbtpptsWMY7hhft57zj282tEBAWWY7Y8vcHZ7L6jS4Sg4J25dBaoD3kaH4zJMCwgCVoWFjlZUjaxgRzX";

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

  return await response.json();
}

export function logout() {
  localStorage.removeItem("access_token");
}
