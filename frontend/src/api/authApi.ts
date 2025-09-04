import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log('token', token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('config', config)
  return config;
});

export default API;
