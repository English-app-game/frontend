import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GameTypes, RoomStatus } from "../consts/gameTypes";
import { ROUTES } from "../routes/routes_consts";
import { getRoom } from "../services/room/getRoom";
import { setRoom } from "../store/slices/roomSlice";
import { getAllGameTypes } from "../services/room/roomType";
export default function useRoomPolling(roomKey) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomStatus = useSelector((state) => state.room.currentStatus);
  useEffect(() => {
    console.log(roomKey, roomStatus);
    if (!roomKey) return;

    const intervalId = setInterval(async () => {
      try {
        const room = await getRoom(roomKey);
        if (
          roomStatus.toLowerCase() === RoomStatus.PLAYING ||
          room?.currentStatus?.toLowerCase() === RoomStatus.PLAYING
        ) {

          const gameTypes = await getAllGameTypes();
          const match = gameTypes.find((gt) => gt._id === room.gameType);
          const gameType = match ? match.name.trim().split(' ').join('') : "Unknown";

          dispatch(setRoom(room));
          navigate(
            ROUTES.ACTIVE_ROOM(roomKey, gameType || GameTypes.TRANSLATION)
          );
        }
      } catch (err) {
        console.error("Error polling room:", err);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [roomKey, roomStatus, navigate]);
}
