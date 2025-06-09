import RoomHeader from "./RoomHeader";
import PlayersList from "./PlayerList";
import RoomFooter from "./RoomFooter";
import useAuthRedirect from "@hooks/useAuthRedirect";
import { fetchPlayers } from "../../../../services/room/getPlayers";

import { ROUTES } from "../../../../routes/routes_consts";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function WaitingRoom() {
  useAuthRedirect();

  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("1KO4W7H");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

 const handleStart = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser._id) {
      console.error("❌ User not found in localStorage");
      return;
    }

    const res = await fetch("http://localhost:3000/api/memorygame/init-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomKey,
        user: storedUser,
      }),
    });

    const data = await res.json();
    console.log("✅ init-room response:", data);

    navigate(ROUTES.ACTIVE_ROOM(roomKey));
  } catch (err) {
    console.error("Failed to initialize room", err);
  }
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
