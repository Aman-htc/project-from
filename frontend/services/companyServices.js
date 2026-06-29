

import api from "./api";

export const saveCompany = async (data) => {
  const response = await api.post("/company", data);
  return response.data;
};

export const getCompany = async () => {
  const response = await api.get("/company");
  return response.data;
};
export const updateCompany = async (id,data) => {
  const response = await api.put(`/company/${id}`,data);
  return response.data;
};


