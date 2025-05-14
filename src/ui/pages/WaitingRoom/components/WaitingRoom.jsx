import RoomHeader from "./RoomHeader";
import PlayersList from "./PlayerList";
import RoomFooter from "./RoomFooter";
import useAuthRedirect from "@hooks/useAuthRedirect";

import { ROUTES } from "../../../../routes/routes_consts";
import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function WaitingRoom() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useAuthRedirect();
  
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
  //for now it manualy. Itay and I need to solve something in the DB
  const playersAtGame = ["Liad", "Tomer", "Itay"];
  const host = "Liad";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/homePage.png')] bg-cover bg-center">
      <RoomHeader />
      <PlayersList playersAtGame={playersAtGame} host={host} />
      <RoomFooter
        copied={copied}
        handleCopy={handleCopy}
        handleStart={handleStart}
        roomKey={roomKey}
      />
    </div>
  );
}
