import { useSelector } from "react-redux";
import React, { useRef, useEffect } from "react";
import { TRANSLATION_GAME_ASSETS_PATH, TRANSLATION_GAME_EVENTS } from "../../../consts/translationGame";
import { toast } from "react-toastify";
import { emitMatchWord } from "../../../services/translationGame";

function EnglishWords({
  words,
  emit,
  hebWordSelected,
  compareWordIds,
  setHebWordSelected,
}) {
  const roomKey = useSelector((store) => store.translationGame.roomKey);
  const userId = useSelector((store) => store.user.id);

  const handleClick = (englishId) => {
    if (!hebWordSelected) return;
    const hebWordId = compareWordIds(englishId);
    if (!hebWordId) {
      toast.dismiss();
      toast.error("❌ Incorrect match!");
      return;
    }

    setHebWordSelected(null);

    emitMatchWord(emit, {
      roomKey,
      hebWordId: hebWordId,
      englishId,
      userId,
    });
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4">
      {words?.map((word, index) => {
        const fishIndex = (index % 10) + 1;
        const fishSrc = TRANSLATION_GAME_ASSETS_PATH.FISH(fishIndex);

        return (
          !word.disabled && (
            <button
              key={word.id}
              onClick={() => handleClick(word.id)}
              disabled={word.disabled}
              className={`flex flex-col items-center justify-center text-center transition active:scale-95 ${
                word.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <img
                src={fishSrc}
                alt="fish"
                className="w-28 h-14 object-contain"
                draggable={false}
              />
              <span className="mt-1 text-black font-semibold text-sm leading-tight break-words">
                {word.word}
              </span>
            </button>
          )
        );
      })}
    </div>
  );
}
export default React.memo(EnglishWords);
