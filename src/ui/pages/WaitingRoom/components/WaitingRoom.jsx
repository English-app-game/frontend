import RoomHeader from "./RoomHeader";
import PlayersList from "./PlayerList";
import RoomFooter from "./RoomFooter";

import { ROUTES } from "../../../../routes/routes_consts";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import socket from "../../../../sockets/socket";

export default function WaitingRoom() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [playersAtGame, setPlayersAtGame] = useState([]);
  const host = playersAtGame[0] || "HOST";

  useEffect(() => {

    socket.emit("joinRoom", roomId);
    socket.on("roomsList", (rooms) => {
      const room = rooms.find((r) => r.id === roomId);
      if (room) {
        const players = room.players || Array(room.currentPlayers).fill("Player");
        setPlayersAtGame(players);
      }
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("roomsList");
    };
  }, [roomId]);


  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleStart = () => {
    navigate(ROUTES.ACTIVE_ROOM(roomId));
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/homePage.png')] bg-cover bg-center">
      <RoomHeader />
      <PlayersList playersAtGame={playersAtGame} host={host} />
      <RoomFooter copied={copied} handleCopy={handleCopy} handleStart={handleStart} />
    </div>
  );
}
