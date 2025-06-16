import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { TRANSLATION_GAME_EVENTS } from "../../../consts/translationGame";
import { toast } from "react-toastify";
import { emitMatchWord } from "../../../services/translationGame";

export default function EnglishWords({
  words,
  emit,
  hebWordSelected,
  compareWordIds,
  setHebWordSelected
}) {
  const roomKey = useSelector((store) => store.translationGame.roomKey);
  const userId = useSelector((store) => store.user.id);

  const handleClick = (englishId) => {
    if (!hebWordSelected) return;
    const hebWordId = compareWordIds(englishId);
    if (!hebWordId) {
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
    <div className="grid grid-cols-4 gap-3 p-4">
      {words?.map((word) => (
        <button
          key={word.id}
          onClick={() => handleClick(word.id)}
          disabled={word.disabled}
          className="w-full px-4 py-2 rounded-xl font-semibold border bg-white hover:bg-gray-100 transition break-words text-center"
          style={{ wordBreak: "break-word", minHeight: "3rem" }}
        >
          {word.word}
        </button>
      ))}
    </div>
  );
}

// FIXES:
// 1. fix emit messages to use consts and service functions
// 2. Transfer logic to service
// 3. fix shuffle bug by seperating eng and heb words. check
// 4. no need for two ids as its the same id check
// 5. use closure for heb eng id comparison check
