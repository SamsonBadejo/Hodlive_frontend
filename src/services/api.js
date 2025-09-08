import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://hodlive-backend.onrender.com/",
});

// Attach token automatically
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("adm_jwt");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default api;
