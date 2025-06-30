import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { resetRoom } from "../store/slices/roomSlice";
import { LOGIN, ROOMS_LIST } from "../routes/routes_consts";
import { HOME } from "../routes/routes_consts";
import { failToParseUser, loggedIn, loggedOut, errorDuringLogOut, failedToParseFromStorage } from "./hooksStrings";
import { userS, tokenS} from "../consts/strings"

export default function useAuthRedirect({ mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem(tokenS) || sessionStorage.getItem(tokenS);
    const storedUser =
      localStorage.getItem(userS) || sessionStorage.getItem(userS);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (err) {
        console.warn(failToParseUser, err);
        if (mode === loggedIn) navigate(LOGIN);
        return;
      }
    }

    if (mode === loggedIn && !token) {
      navigate(LOGIN);
    }

    if (mode === loggedOut && token) {
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
    console.error(errorDuringLogOut, error);
    localStorage.clear();
    sessionStorage.clear();
    navigate(HOME);
  }
};

export const getStoredUser = () => {
  try {
    const data = localStorage.getItem(userS) || sessionStorage.getItem(userS);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.log(failedToParseFromStorage, err);
    return null;
  }
};
