import axios from "axios";

export const API_BASE_URL = "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 60000,
});

export const registerAPI = (data) => {
  return apiClient.post("/auth/register", data);
};

export const loginAPI = (data) => {
  return apiClient.post("/auth/login", data);
};

export const getMeAPI = () => {
  return apiClient.get("/auth/me");
};

export const logoutAPI = () => {
  return apiClient.post("/auth/logout");
};
