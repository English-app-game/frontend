import { useNavigate, useLocation } from "react-router-dom";
import PrimaryButton from "../../ui/components/PrimaryButton";
import BlueBox from "../../ui/components/BlueBox";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import {PLAYER_SCORE} from "../../consts/consts";



//***DONT FORGET***- when the page game is done, add nevigate to this page after the game is over!!!!!!!!

export default function GameOver() {
  const navigate = useNavigate();
  
  let user = null;
  try {
     user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    user = null;
}
  const playerId = user?.id;

  const [score, setScore] = useState(null);
  const [gameName, setGameName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerId){
        console.log("No playerId found");
         return;
         }

    console.log("Fetching score for:", playerId);

    
  fetch(`${PLAYER_SCORE}/${playerId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Score not found");
      return res.json();
    })
    .then((data) => {
      console.log("Score data:", data);
      setScore(data.score);
      setGameName(data.gameTypeId?.name || "Unknown Game");
    })
    .catch((err) => {
      console.error("Error fetching score:", err);
    })
    .finally(() => setLoading(false));
}, [playerId]);


  const handleBackToRooms = () => {
    navigate("/rooms");
  };

  return (
    <div className="bg-[url('/homePage.png')] bg-cover min-h-screen flex items-center justify-center">
      <BlueBox size="large" className="text-center w-[35rem] h-[28rem] flex flex-col justify-center items-center gap-4 shadow-xl">
  <Header text="🎉 GAME OVER 🎉" className="text-4xl font-extrabold uppercase text-white drop-shadow" />

  {!loading && (
    <>
      <p className="text-2xl text-white font-semibold">
        Your Score: <span className="text-yellow-300 text-3xl animate-pulse"> {score} 🏆</span>
      </p>
      <p className="text-xl text-white italic">
        Game Type: <span className="text-teal-200">{gameName}</span>
      </p>
    </>
  )}

  {loading && (
    <p className="text-white text-xl animate-pulse">Loading your score...</p>
  )}

  <PrimaryButton
    text="Back to Rooms"
    onClick={handleBackToRooms}
    className="mt-8 bg-green-400 hover:scale-105 transition-transform"
  />
</BlueBox>
    </div>
  );
}
