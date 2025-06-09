import { useNavigate, useLocation } from "react-router-dom";
import PrimaryButton from "../../ui/components/PrimaryButton";
import BlueBox from "../../ui/components/BlueBox";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import {fetchLastScore} from "../../../src/services/scoreService";
import {ROOMS_LIST} from "../../routes/routes_consts";
import ScoreResult from "../../ui/components/ScoreResult";



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
         return;
         }

  
  const getScore = async () => {
    try {
      const data = await fetchLastScore(playerId);
      setScore(data.score);
      setGameName(data.gameTypeId?.name || "Unknown Game");
    } catch (err) {
      console.error("Error fetching score:", err);
    } finally {
      setLoading(false);
    }
  };

  getScore();
}, [playerId]);


  const handleBackToRooms = () => {
    navigate(ROOMS_LIST);
  };

  return (
    <ScoreResult score={score} gameName={gameName} loading={loading} />
  );
}
