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
          let gameType = match
            ? match.name.trim().split(" ").join("")
            : "Unknown";

          if (!gameType) {
            console.error("Game type not found for room:", roomKey);
            navigate(ROUTES.ROOMS_LIST);
            return;
          }

          dispatch(setRoom(room));
          navigate(ROUTES.ACTIVE_ROOM(roomKey, gameType));
        }
      } catch (err) {
        console.error("Error polling room:", err);
        // If room not found (404), stop polling and redirect to rooms list
        if (err.message === "Room not found") {
          console.log("🚫 Room deleted, stopping polling and redirecting");
          clearInterval(intervalId);
          navigate(ROUTES.ROOMS_LIST);
          return;
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [roomKey, roomStatus, navigate]);
}
