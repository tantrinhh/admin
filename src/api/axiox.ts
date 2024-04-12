// axios.ts

import axios from "axios";
import BASE_URL_STRAPI from "./constants";

const api = axios.create({
  baseURL: `${BASE_URL_STRAPI}`, // Điểm cuối API của bạn
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
