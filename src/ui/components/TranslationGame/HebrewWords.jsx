import React from "react";
import { useSelector } from "react-redux";

function HebrewWords({ words, emit, setSelectedHebrewWord }) {
  const userId = useSelector((state) => state.user.id);
  const roomKey = useSelector((state) => state.translationGame.roomKey);
  const users = useSelector((state) => state.translationGame.users);

  const handleLock = (wordId) => {
    setSelectedHebrewWord((prev) => (prev === wordId ? null : wordId));
    emit("lock-word", { roomKey, wordId, userId });
  };

  if (!Array.isArray(words) || words.length === 0) {
    return <div className="p-4 text-center text-gray-500">אין מילים להצגה</div>;
  }

  return (
    <div
      className="relative grid grid-cols-5 gap-2 p-3 w-1/2 ml-auto"
      dir="rtl"
    >
      <img
        src="/translation_game/boat.png"
        className="z-2 top-1/4 absolute h-20 w-full"
        alt=""
      />
      {words.map((word) => {
        if (!word?.word || !word?.id) {
          console.warn("⚠️ Malformed word object:", word);
          return null;
        }

        const { id, word: hebWord, heldBy } = word;
        const isLocked = Boolean(heldBy);
        const lockedByMe = heldBy === userId;
        const color = heldBy ? users[heldBy]?.color : null;

        return (
          <div className="relative z-100" onClick={() => handleLock(id)}>
            <img
              src="/translation_game/bucket.png"
              alt="bucket"
              draggable={false}
              className="absolute w-16 -translate-y-1/2"
            />

            <button
              key={id}
              disabled={isLocked && !lockedByMe}
              className={`
      relative z-10
      w-16 h-full
      flex items-center justify-center
      rounded-lg border font-semibold transition
      ${isLocked ? "ring-2 ring-blue-500 opacity-80" : "hover:bg-gray-100"}
      text-black
    `}
              style={{ backgroundColor: color || "#fff" }}
              dir="rtl"
            >
              {hebWord}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(HebrewWords);
