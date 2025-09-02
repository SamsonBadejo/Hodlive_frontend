import api from "./api";

export const loginAdmin = (creds) => api.post("/auth/login", creds); // {token}
