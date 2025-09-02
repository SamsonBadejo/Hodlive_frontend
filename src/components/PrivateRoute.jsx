import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { token } = useContext(AuthCtx);
  return token ? children : <Navigate to="/admin/login" replace />;
}
