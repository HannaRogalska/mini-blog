import axios from "axios";
import { store } from "../store";
import { setAuth } from "../store/authSlice";

export const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  console.log("Token before request:", store.getState().auth.token);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await instance.post("/auth/refresh-token");
        const newAccessToken = res.data.accessToken;
        store.dispatch(setAuth(newAccessToken));
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
