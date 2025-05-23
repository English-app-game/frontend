import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../routes/routes_consts";
import { VERIFY_TOKEN } from "../consts/api";
import { isTokenExpired } from "../utils/auth";

export default function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      logout();
      return;
    }

    fetch(VERIFY_TOKEN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token invalid");
        return res.json();
      })
      .catch(() => {
        logout();
      });

    function logout() {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate(LOGIN);
    }
  }, []);
}
