import api from "../../services/axios";

export const login = async (credentials) => {
  const { data } = await api.post("/user/login", credentials);

  return data;
};

export const getUserProfile = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export const signup = async (userData) => {
  const response = await api.post(
    "/user/signup",
    userData
  );

  return response.data;
};