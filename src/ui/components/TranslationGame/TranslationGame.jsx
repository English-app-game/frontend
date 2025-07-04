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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProtectUrl } from "../../../hooks/useProtectUrl";

export default function TranslationGame({
  roomKey,
  handleBack,
  playersAmount,
  level,
}) {
  const navigate = useNavigate();
  const { emit } = useSocket();
  const blocked = useProtectUrl();

  const user = useSelector((store) => store.user);
  const { id: userId } = user;
  const gameEnded = useSelector((store) => store.translationGame.end);
  const enWords = useSelector((store) => store.translationGame.enWords);
  const hebWords = useSelector((store) => store.translationGame.hebWords);

  const availableEnWords = useMemo(() => {
    if (!enWords) return [];

    const MAX = 10;

    const result = enWords.slice(0, MAX);
    const usedIds = new Set(
      result.filter((w) => w && !w.disabled).map((w) => w.id)
    );

    let scanIndex = MAX;
    for (let i = 0; i < result.length; i++) {
      if (!result[i] || !result[i].disabled) continue;

      while (
        scanIndex < enWords.length &&
        (enWords[scanIndex].disabled || usedIds.has(enWords[scanIndex].id))
      ) {
        scanIndex++;
      }

      if (scanIndex < enWords.length) {
        result[i] = enWords[scanIndex];
        usedIds.add(enWords[scanIndex].id);
        scanIndex++;
      }
    }

    return result;
  }, [enWords]);

  const renderedIds = useMemo(
    () => new Set(availableEnWords?.map((word) => word.id)),
    [availableEnWords]
  );

  const availableHeWords = useMemo(
    () =>
      hebWords
        ?.filter((word) => !word.disabled && renderedIds.has(word.id))
        .slice(0, 5),
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
    return () => toast.dismiss();
  }, []);

  if (blocked) return null;

  console.log(playersAmount, level);

  useEffect(() => {
    if (!roomKey || !userId || !gameTypeId) return;

    joinTranslationGameRoom(emit, {
      roomKey: `${roomKey}/${GameTypes.TRANSLATION}`,
      user,
      gameTypeId,
      playersAmount: playersAmount || 2,
      level: level || "easy",
    });
  }, [roomKey, userId, emit, user]);

  // sync the held hebrew word if user refreshed.
  useEffect(() => {
    const heldWord = hebWords?.find(
      (word) => word.heldBy === userId && word.lock
    );
    setSelectedHebrewWord(heldWord ? heldWord.id : null);
  }, [userId, hebWords]);

  if (gameEnded) return <EndGame emit={emit} />;

  return (
    <section
      className=" relative z-[1] h-screen grid grid-rows-4 overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: 'url("/translation_game/bg.svg")' }}
    >
      {/* Scoreboard & Exit */}

      <div className="row-span-1 flex justify-between items-center px-6 py-3 shadow-md">
        <ScoreBoard handleBack={handleBack} />
      </div>

      {/* Hebrew Words */}
      <div className="row-span-1 text-sm">
        <HebrewWords
          words={availableHeWords}
          emit={emit}
          setSelectedHebrewWord={setSelectedHebrewWord}
        />
      </div>

      {/* English Words */}
      <div className="row-span-2 text-sm">
        <EnglishWords
          words={availableEnWords}
          emit={emit}
          compareWordIds={compareWordIds}
          hebWordSelected={selectedHebrewWordId}
          setHebWordSelected={setSelectedHebrewWord}
        />
      </div>
      <RotateNotice />
    </section>
  );
}
