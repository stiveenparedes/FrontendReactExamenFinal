import api from "./api";

export const fetchDirectors = async () => {
  const response = await api.get("/api/directors/");
  return response.data;
};

export const fetchDirectorById = async (id) => {
  const response = await api.get(`/api/directors/${id}/`);
  return response.data;
};

export const addDirector = async (data) => {
  const response = await api.post("/api/directors/", data);
  return response.data;
};

export const updateDirector = async (id, data) => {
  const response = await api.put(`/api/directors/${id}/`, data);
  return response.data;
};

export const deleteDirector = async (id) => {
  const response = await api.delete(`/api/directors/${id}/`);
  return response.data;
};
