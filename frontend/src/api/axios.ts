import axios from "axios";
import { store } from "../store";


export const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
instance.interceptors.response.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await instance.post("/auth/refresh-token");

      return instance(originalRequest);
    }

    throw error;
  }
);