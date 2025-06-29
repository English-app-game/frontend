import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/routes_consts";
import { resetTranslationGameState } from "../../../../store/slices/translationGameSlice";
import { resetRoom } from "../../../../store/slices/roomSlice";
import { useEndGameCleanup } from "../../../../hooks/useEndGameCleanup";
import TextButton from "../../TextButton";
import EndGameHeader from "./EndGameHeader";
import ScoreboardList from "./ScoreboardList";
import { toast } from "react-toastify";
import { enteredToGameFrom } from "../../../../consts/strings";

export default function EndGame({ emit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dynamicScoreboard = useSelector(
    (store) => store.translationGame.scoreboard
  );
  const roomKey = useSelector((store) => store.translationGame.roomKey);
  const userId = useSelector((store) => store.user.id);
  const hostId = useSelector((store) => store.translationGame.host.id);

  const gameType = useSelector((store) => store.translationGame.gameTypeId);

  // To keep scoreboard snapshot
  const scoreboard = useMemo(() => dynamicScoreboard.slice(), []);
  useEndGameCleanup({ roomKey, userId, hostId, scoreboard, gameType, emit });


  const handleExit = () => {
    toast.dismiss();
    dispatch(resetTranslationGameState());
    dispatch(resetRoom());
    localStorage.removeItem(enteredToGameFrom);
    navigate(ROUTES.ROOMS_LIST);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6"
      dir="rtl"
    >
      <EndGameHeader />
      <ScoreboardList scoreboard={scoreboard} />

      <TextButton
        onClick={handleExit}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow"
      >
        יציאה מהמשחק
      </TextButton>
    </div>
  );
}
