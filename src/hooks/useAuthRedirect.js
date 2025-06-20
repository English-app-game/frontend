import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { resetRoom } from "../store/slices/roomSlice";
import { LOGIN, ROOMS_LIST } from "../routes/routes_consts";
import { HOME } from "../routes/routes_consts";

export default function useAuthRedirect({ mode }) {
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
      } catch (err) {
        console.warn("Failed to parse stored user:", err);
        if (mode === "loggedIn") navigate(LOGIN);
        return;
      }
    }

    if (mode === "loggedIn" && !token) {
      navigate(LOGIN);
    }

    if (mode === "loggedOut" && token) {
      navigate(ROOMS_LIST);
    }
  }, []);
}

export const handleLogout = async (
  navigate,
  socket = null,
  currentRoomKey = null,
  dispatch = null,
  leaveWaitingRoom = null
) => {
  try {
    const user = getStoredUser();

    if (user && user.id && currentRoomKey && leaveWaitingRoom) {
      await leaveWaitingRoom(currentRoomKey, user.id);
      
      if (dispatch) {
        dispatch(resetRoom());
      }
    }

    localStorage.clear();
    sessionStorage.clear();

    if (socket && socket.connected) {
      socket.disconnect();
    }

    navigate(HOME);
  } catch (error) {
    console.error("Error during logout:", error);
    localStorage.clear();
    sessionStorage.clear();
    navigate(HOME);
  }
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
