import { apiClient } from "./auth.api";

export const invokeAPI = (input) => {
  return apiClient.post("/invoke", { input });
};
