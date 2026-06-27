

import api from "./api";

export const saveCompany = async (data) => {
  const response = await api.post("/company", data);
  return response.data;
};