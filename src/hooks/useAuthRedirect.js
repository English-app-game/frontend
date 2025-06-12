import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { LOGIN, ROOMS_LIST, SET_NEW_PASSWORD } from "../routes/routes_consts";
import { HOME } from "../routes/routes_consts";

export default function useAuthRedirect({ mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const location = useLocation();


  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (err) {
        console.warn("Failed to parse stored user:", err);
        if (mode === "loggedIn") navigate(LOGIN);
        return;
      }
    }

    const currentPath = location.pathname;
    const isResetPasswordPage = currentPath.startsWith(`/${SET_NEW_PASSWORD}`);

     if (mode === "loggedIn") {
      if (!token && !isResetPasswordPage) {
        navigate(LOGIN);
      }
    }


      if (mode === "loggedOut" && token) {
        navigate(ROOMS_LIST);
      }
  }, [mode, navigate, dispatch]);
}

const handleLogout = (navigate) => {
  localStorage.clear();
  sessionStorage.clear();
  navigate(HOME);
};

export const submitLogout = (navigate) => {
  return () => handleLogout(navigate);
};

export const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user") || sessionStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.log("Failed to parse user from storage:", err);
    return null;
  }
};
