import api from "./api";

// LISTAR directores
export const fetchDirectors = async () => {
  const response = await api.get("/api/directors/");
  return response.data;
};

// OBTENER un director
export const fetchDirectorById = async (id) => {
  const response = await api.get(`/api/directors/${id}/`);
  return response.data;
};

// CREAR director
export const addDirector = async (data) => {
  const response = await api.post("/api/directors/", data);
  return response.data;
};

// ACTUALIZAR director
export const updateDirector = async (id, data) => {
  const response = await api.put(`/api/directors/${id}/`, data);
  return response.data;
};

// ELIMINAR director
export const deleteDirector = async (id) => {
  const response = await api.delete(`/api/directors/${id}/`);
  return response.data;
};
