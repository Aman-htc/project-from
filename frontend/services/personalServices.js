import api from "./api";

export const savePersonal = async (data) => {
  const response = await api.post("/personal", data);
  return response.data;
};
