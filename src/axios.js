import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog.kata.academy/api",
});
instance.interceptors.request.use((config) => {
  const newConfig = { ...config };
  if (newConfig.headers) {
    newConfig.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
    return newConfig;
  }
  return newConfig;
});

export default instance;
