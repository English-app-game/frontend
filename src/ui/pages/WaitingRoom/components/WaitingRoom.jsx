import RoomHeader from "./RoomHeader";
import PlayersList from "./PlayerList";
import RoomFooter from "./RoomFooter";
import { fetchPlayers } from "../../../../services/room/getPlayers";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../../../store/slices/roomSlice";
import startGameService from "../../../../services/startGame";
import useRoomPolling from "../../../../hooks/useRoomPolling";

export default function WaitingRoom() {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const room = useSelector((store) => store.room);
  const userId = useSelector((store) => store.user.id);
  const { id: roomKey } = useParams();
  const [players, setPlayers] = useState([]);
  const [hostId, setHostId] = useState(null);

  useRoomPolling(roomKey);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleStart = async () => {
    // comment this check if this blocks starting the game
    if (room.players.length < 2) {
      alert("At least 2 players are required to start the game.");
      return;
    }

    if (userId !== room.admin) {
      alert("Only the host can start the game.");
      return;
    }

    try {
      const updatedRoom = await startGameService(roomKey);
      // assuming gametype translation..
      dispatch(startGame(updatedRoom.currentStatus));
    } catch (error) {
      console.error(error);
      alert("Failed to start the game. Please try again later.");
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchPlayers(roomKey);
        if (data.players.length !== players.length) {
          setPlayers(data.players);
          setHostId(data.admin._id);
        }
      } catch (err) {
        console.error("Failed fetching players", err);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/homePage.png')] bg-cover bg-center">
      <RoomHeader />
      <PlayersList players={players} hostId={hostId} />
      <RoomFooter
        copied={copied}
        handleCopy={handleCopy}
        handleStart={handleStart}
        roomKey={roomKey}
      />
    </div>
  );
}
