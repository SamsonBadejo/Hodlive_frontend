import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",      // ← change for production
});

/* attach token automatically */
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("adm_jwt");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default api;
