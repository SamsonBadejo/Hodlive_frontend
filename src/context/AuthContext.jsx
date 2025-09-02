import { createContext, useState, useEffect } from "react";

export const AuthCtx = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("adm_jwt"));

  const signIn = (t) => {
    localStorage.setItem("adm_jwt", t);
    setToken(t);
  };

  const signOut = () => {
    localStorage.removeItem("adm_jwt");
    setToken(null);
  };

  /* keep context fresh across tabs */
  useEffect(() => {
    const sync = (e) => {
      if (e.key === "adm_jwt") setToken(localStorage.getItem("adm_jwt"));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <AuthCtx.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}
