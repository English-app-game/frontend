import { useSelector } from "react-redux";

export default function HebrewWords({ words, emit, setSelectedHebrewWord }) {
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
    <div className="grid grid-cols-4 gap-3 p-4" dir="rtl">
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
          <button
            key={id}
            onClick={() => handleLock(id)}
            disabled={isLocked && !lockedByMe}
            className={`px-3 py-2 rounded-lg font-semibold border transition
              ${isLocked ? "opacity-80" : "hover:bg-gray-100"}
              ${color ? "border-[3px]" : "border"}
              text-black
            `}
            style={{ backgroundColor: color || "#ffffff" }}
          >
            {hebWord}
          </button>
        );
      })}
    </div>
  );
}
