import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { resetRoom } from "../store/slices/roomSlice";
import { LOGIN, ROOMS_LIST } from "../routes/routes_consts";
import { HOME } from "../routes/routes_consts";
import removeUserFromRoom from "../services/room/removeUserFromRoom";


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
  }, [mode, navigate, dispatch]);
}


const handleLogout = async (navigate, socket = null, currentRoomKey = null, dispatch = null) => {
  try {
    const user = getStoredUser();
    
    if (user && user.id && currentRoomKey) {
      await removeUserFromRoom(currentRoomKey, user.id);
      
      if (socket) {
        socket.emit("leave-waiting-room", { roomKey: currentRoomKey, userId: user.id });
        socket.emit("remove-from-waiting-room", { roomKey: currentRoomKey, userId: user.id });
      }
      
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

export const submitLogout = (navigate, socket = null, currentRoomKey = null, dispatch = null) => {
  return () => handleLogout(navigate, socket, currentRoomKey, dispatch);
};

export const getStoredUser = () => {
  try{
    const data =  localStorage.getItem("user") || sessionStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.log("Failed to parse user from storage:",err)
    return null;
  }
}