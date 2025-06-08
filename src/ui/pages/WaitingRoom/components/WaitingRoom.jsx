import RoomHeader from "./RoomHeader";
import PlayersList from "./PlayerList";
import RoomFooter from "./RoomFooter";
import { fetchPlayers } from "../../../../services/room/getPlayers";


import { ROUTES } from "../../../../routes/routes_consts";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function WaitingRoom() {

  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const room = useSelector((store) => store.room);
  console.log(room);
  const handleCopy = () => {
    navigator.clipboard.writeText("1KO4W7H");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleStart = () => {
    navigate(ROUTES.ACTIVE_ROOM(roomKey));
  };

  const { id: roomKey } = useParams();
  const [players, setPlayers] = useState([]);
  const [hostId, setHostId] = useState(null);
  
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
