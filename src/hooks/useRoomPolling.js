import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GameTypes } from "../consts/gameTypes";
import { ROUTES } from "../routes/routes_consts";
import { getRoom } from "../services/room/getRoom";
import startGame from "../services/startGame";
import { setRoom } from "../store/slices/roomSlice";
export default function useRoomPolling(roomKey) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomStatus = useSelector((state) => state.room.currentStatus);

  useEffect(() => {
    console.log(roomKey, roomStatus)
    if (!roomKey) return;

    const intervalId = setInterval(async () => {
      try {
        const room = await getRoom(roomKey);

        console.log(room);
        if (
          roomStatus.toLowerCase() === "playing" ||
          room?.currentStatus?.toLowerCase() === "playing"
        ) {
          // TODO: create a feature to determine which game type should start.
          // For now, we assume that the game type is always translation.
          // We need to get the name of the game type from the ID, idk why we didn't do it before and we decided to save it as an ID instead of a name or maybe as an object that contains both ID and name.
          dispatch(setRoom(room));

          navigate(ROUTES.ACTIVE_ROOM(roomKey, GameTypes.TRANSLATION));
        }
      } catch (err) {
        console.error("Error polling room:", err);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [roomKey, roomStatus, navigate]);
}
