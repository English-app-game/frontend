import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROOMS_LIST } from "../routes/routes_consts";

export default function useRedirectLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      navigate(ROOMS_LIST);
    }
  }, []);
}
