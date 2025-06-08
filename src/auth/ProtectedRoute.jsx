import { Navigate } from "react-router-dom";
import { LOGIN } from "../routes/routes_consts";

export default function ProtectedRoute({ children }) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return token ? children : <Navigate to={LOGIN} replace />;
}
