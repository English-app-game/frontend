import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../routes/routes_consts";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

export default function useAuthRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (!token) {
      navigate(LOGIN);
      return;
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (_err) {
        navigate(LOGIN); 
      }
    }
  }, [dispatch, navigate]);
}
