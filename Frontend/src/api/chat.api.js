import { apiClient } from "./auth.api";

export const getSolutionsAPI = (input) => {
  return apiClient.post("/invoke/solutions", { input });
};

export const getJudgeAPI = (payload) => {
  return apiClient.post("/invoke/judge", payload);
};

export const getChatsAPI = () => {
  return apiClient.get("/chat");
};

export const deleteChatAPI = (chatId) => {
  return apiClient.delete(`/chat/${chatId}`);
};
