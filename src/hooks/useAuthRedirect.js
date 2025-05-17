import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../routes/routes_consts"

export default function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate(LOGIN);
    }
  }, []);
}
