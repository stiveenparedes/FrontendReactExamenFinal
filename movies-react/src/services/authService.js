const API_URL = "http://localhost:8000/api";

export async function login(username, password) {
  const response = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Error en login");
  }

  return await response.json();
}

export async function logout() {
  localStorage.removeItem("access_token");
}
