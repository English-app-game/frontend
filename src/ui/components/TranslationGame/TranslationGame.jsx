import { useSelector } from "react-redux";
import ScoreBoard from "./Scoreboard";
import { useEffect, useMemo } from "react";
import { useSocket } from "../../../hooks/useSocket";
import EnglishWords from "./EnglishWords";
import HebrewWords from "./HebrewWords";

export default function TranslationGame({ roomKey, handleBack }) {
  const { emit } = useSocket();

  const user = useSelector((store) => store.user);
  const { id: userId } = user;

  // For Testing
  const room = useSelector((store) => store.translationGame);
  // console.log(room);

  const wordsSelector = useSelector((store) => store.translationGame.words);
  // show at most 20 words
  const words = useMemo(() => {
    return wordsSelector.slice(0, 20).sort((a, b) => a.id.localeCompare(b.id));
  }, [wordsSelector]);

  const englishWords = useMemo(
    () =>
      words.map((word) => ({
        word: word.eng.word,
        id: word.id,
      })),
    [words]
  );

  const hebrewWords = useMemo(
    () =>
      words.map((word) => ({
        word: word.heb.word,
        id: word.id,
      })),
    [words]
  );

  useEffect(() => {
    if (!roomKey || !userId) return;
    emit("join-room", {
      roomKey,
      user,
    });
  }, [roomKey, userId, emit, user]);

  return (
    <section className="relative z-[9999] min-h-screen grow grid grid-rows-6">
      <div className="row-span-1 bg-red-100 flex justify-between items-center px-6 py-4 rounded-b-xl shadow">
        <ScoreBoard />
        <button
          onClick={handleBack}
          className="bg-white text-red-600 border border-red-300 px-4 py-2 rounded-xl hover:bg-red-50 transition font-medium"
        >
          יציאה מהמשחק
        </button>
      </div>

      <div className="row-span-3 bg-gray-300">
        <EnglishWords words={englishWords} />
      </div>
      <div className="row-span-2 bg-blue-100">
        <HebrewWords words={hebrewWords} />
      </div>
    </section>
  );
}
