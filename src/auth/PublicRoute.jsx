import { Navigate } from "react-router-dom";
import { ROOMS_LIST } from "../routes/routes_consts";

export default function PublicRoute({ children }) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return token ? <Navigate to={ROOMS_LIST} replace /> : children;
}
