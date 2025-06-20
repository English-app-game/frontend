import { ROUTES } from "../routes/routes_consts";
import { resetRoom } from "../store/slices/roomSlice.js";

export const handleExitWaitingRoom = async (exitRoom, navigate, dispatch) => {
    if (exitRoom) {
      // Use the comprehensive exit function from parent
      await exitRoom();
    } else {
      // Fallback to navigate if exitRoom is not provided
      dispatch(resetRoom());
      navigate(ROUTES.ROOMS_LIST);
    }
  };