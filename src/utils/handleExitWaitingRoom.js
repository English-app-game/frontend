import removeUserFromRoom from "../services/room/removeUserFromRoom.js";
import { ROUTES } from "../routes/routes_consts";
import { WAITING_ROOM_EVENTS } from "../consts/socketEvents";
import { resetRoom } from "../store/slices/roomSlice.js";

export const handleExitWaitingRoom = async (user, roomKey, navigate, socket, dispatch) => {
    console.log(`🚪 User ${user?.name} (${user?.id}) exiting room ${roomKey}`);

    if (!user || !user.id || !roomKey) {
      dispatch(resetRoom());
      return navigate(ROUTES.ROOMS_LIST);
    }

    try {
      await removeUserFromRoom(roomKey, user.id);
      console.log(
        `📤 Emitting LEAVE event for user ${user.id} in room ${roomKey}`
      );
      socket.emit(WAITING_ROOM_EVENTS.LEAVE, { roomKey, userId: user.id });

      dispatch(resetRoom());
      navigate(ROUTES.ROOMS_LIST);
    } catch (error) {
      console.error("Error during exit:", error);
      dispatch(resetRoom());
      navigate(ROUTES.ROOMS_LIST);
    }
  };