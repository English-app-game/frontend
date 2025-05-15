import RoomHeader from "./RoomHeader";
import PlayersList from "./PlayerList";
import RoomFooter from "./RoomFooter";
import useAuthRedirect from "@hooks/useAuthRedirect";

import { ROUTES } from "../../../../routes/routes_consts";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";

export default function WaitingRoom() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useAuthRedirect();
  
  const handleCopy = () => {
    navigator.clipboard.writeText("1KO4W7H");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleStart = () => {
    const roomId = "1KO4W7H"; //for now I did it manualy 
    navigate(ROUTES.ACTIVE_ROOM(roomId));
  };

  const playersAtGame = ["PLAYER1", "PLAYER2", "PLAYER4", "PLAYER5"];
  const host = "PLAYER1";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/homePage.png')] bg-cover bg-center">
      <RoomHeader />
      <PlayersList playersAtGame={playersAtGame} host={host} />
      <RoomFooter copied={copied} handleCopy={handleCopy} handleStart={handleStart} />
    </div>
  );
}
