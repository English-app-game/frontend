import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSocket } from "../../../hooks/useSocket";
import ScoreBoard from "./Scoreboard";
import EnglishWords from "./EnglishWords";
import HebrewWords from "./HebrewWords";
import { joinTranslationGameRoom } from "../../../services/translationGame";
import EndGame from "./EndGame/EndGame";
import { GameTypes } from "../../../consts/gameTypes";
import RotateNotice from "../RotateNotice";
import getStoredUser from "../../../hooks/useAuthRedirect"

// Utility: Fisher-Yates shuffle
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function TranslationGame({ roomKey, handleBack }) {
  const { emit } = useSocket();

  const user = useSelector((store) => store.user);
  const { id: userId } = user;

  const gameEnded = useSelector((store) => store.translationGame.end);
  const enWords = useSelector((store) => store.translationGame.enWords);
  const hebWords = useSelector((store) => store.translationGame.hebWords);

  const availableEnWords = useMemo(
    () => enWords?.filter((word) => !word.disabled).slice(0, 15),
    [enWords]
  );

  const renderedIds = useMemo(
    () => new Set(availableEnWords?.map((word) => word.id)),
    [availableEnWords]
  );

  const availableHeWords = useMemo(
    () =>
      hebWords?.filter((word) => !word.disabled && renderedIds.has(word.id)),
    [hebWords, renderedIds]
  );

  const [selectedHebrewWordId, setSelectedHebrewWord] = useState(null);

  const compareWordIds = useCallback(
    (engWordId) =>
      engWordId === selectedHebrewWordId ? selectedHebrewWordId : false,
    [selectedHebrewWordId]
  );

  const game = useSelector((store) => store.translationGame);
  const gameTypeId = useSelector((store) => store.room.gameType);
  console.log(game);
  console.log(gameTypeId);

  useEffect(() => {
    if (!roomKey || !userId || !gameTypeId) return;
    joinTranslationGameRoom(emit, {
      roomKey: `${roomKey}/${GameTypes.TRANSLATION}`,
      user,
      gameTypeId,
    });
  }, [roomKey, userId, emit, user]);

  // sync the held hebrew word if user refreshed.
  useEffect(() => {
    const heldWord = hebWords?.find(
      (word) => word.heldBy === userId && word.lock
    );
    setSelectedHebrewWord(heldWord ? heldWord.id : null);
  }, [userId, hebWords]);

  if (gameEnded) return <EndGame />;

  return (
    <section className="relative z-[1] h-screen grid grid-rows-6 overflow-hidden">
      {/* Scoreboard & Exit */}
      <div className="row-span-1 bg-red-50 flex justify-between items-center px-6 py-3 shadow">
        <ScoreBoard />
        <button
          onClick={handleBack}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow"
        >
          יציאה מהמשחק
        </button>
      </div>

      {/* English Words */}
      <div className="row-span-3 text-sm bg-gray-300 overflow-y-auto">
        <EnglishWords
          words={availableEnWords}
          emit={emit}
          compareWordIds={compareWordIds}
          hebWordSelected={selectedHebrewWordId}
          setHebWordSelected={setSelectedHebrewWord}
        />
      </div>

      {/* Hebrew Words */}
      <div className="row-span-2 text-sm bg-blue-100 overflow-y-auto">
        <HebrewWords
          words={availableHeWords}
          emit={emit}
          setSelectedHebrewWord={setSelectedHebrewWord}
        />
      </div>
      <RotateNotice />
    </section>
  );
}
