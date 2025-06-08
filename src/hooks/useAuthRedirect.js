import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

/**
 * Redirects the user based on token presence, and loads user from storage into Redux.
 * @param {Object} options
 * @param {string} [options.ifNoToken] - Redirect here if no token is found
 * @param {string} [options.ifToken] - Redirect here if token is found
 */
export default function useAuthRedirect({ ifNoToken, ifToken }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (_err) {
        console.warn("Failed to parse stored user");
        if (ifNoToken) navigate(ifNoToken);
        return;
      }
    }

    if (!token && ifNoToken) {
      navigate(ifNoToken);
    } else if (token && ifToken) {
      navigate(ifToken);
    }
  }, [ifNoToken, ifToken, navigate, dispatch]);
}
