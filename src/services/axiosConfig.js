import axios from "axios";
import { AuthCtx } from "../context/AuthContext.jsx";
import { useContext, useEffect, useMemo } from "react";

export default function useAxios() {
  const { token } = useContext(AuthCtx);

  // 1️⃣ create the single instance once
  const api = useMemo(
    () => axios.create({ baseURL: "http://localhost:5001/api" }),
    []
  );

  // 2️⃣ add / refresh the interceptor whenever the token changes
  useEffect(() => {
    const id = api.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => api.interceptors.request.eject(id); // cleanup
  }, [token, api]);

  return api;
}
