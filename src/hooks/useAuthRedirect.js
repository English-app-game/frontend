import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Redirects the user based on token presence.
 * @param {Object} options
 * @param {string} [options.ifNoToken] - Redirect here if no token is found
 * @param {string} [options.ifToken] - Redirect here if token is found
 */
export default function useAuthRedirect({ ifNoToken, ifToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token && ifNoToken) {
      navigate(ifNoToken);
    } else if (token && ifToken) {
      navigate(ifToken);
    }
  }, [ifNoToken, ifToken, navigate]);
}
