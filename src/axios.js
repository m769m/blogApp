import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog.kata.academy/api",
});

instance.interceptors.request.use((config) => {
  if (config.headers) {
    const newConfig = { ...config };

    newConfig.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;

    return newConfig;
  }

  return config;
});

export default instance;
