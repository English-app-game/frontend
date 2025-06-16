import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes_consts";
import { resetTranslationGameState } from "../../../store/slices/translationGameSlice";
import { resetRoom } from "../../../store/slices/roomSlice";
import { useEndGameCleanup } from "../../../hooks/useEndGameCleanup";

export default function EndGame() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dynamicScoreboard = useSelector(
    (store) => store.translationGame.scoreboard
  );
  const roomKey = useSelector((store) => store.translationGame.roomKey);
  const userId = useSelector((store) => store.user.id);
  const hostId = useSelector((store) => store.translationGame.host.id);

  const gameType = useSelector((store) => store.room.gameType);

  // To keep scoreboard snapshot
  const scoreboard = useMemo(() => dynamicScoreboard.slice(), []);

  useEndGameCleanup({ roomKey, userId, hostId, scoreboard, gameType });

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6"
      dir="rtl"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-red-600 mb-2">
          🏁 המשחק נגמר!
        </h1>
        <p className="text-lg text-gray-700">תודה על ההשתתפות 🎉</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          התוצאות הסופיות
        </h2>

        {scoreboard.length === 0 ? (
          <p className="text-center text-gray-500">לא נמצאו תוצאות.</p>
        ) : (
          <ul className="space-y-3">
            {[...scoreboard]
              .sort((a, b) => b.score - a.score)
              .map(({ userId, name, score, color }, index) => (
                <li
                  key={userId}
                  className={`flex justify-between items-center px-4 py-2 rounded-xl shadow-sm text-sm font-medium ${
                    index === 0 ? "ring-2 ring-yellow-400" : ""
                  }`}
                  style={{ backgroundColor: color || "#f0f0f0" }}
                >
                  <span className="truncate max-w-[60%]">{name}</span>
                  <span className="font-bold text-gray-800">{score}</span>
                </li>
              ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => {
          navigate(ROUTES.ROOMS_LIST);
          dispatch(resetTranslationGameState());
          dispatch(resetRoom());
        }}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow"
      >
        יציאה מהמשחק
      </button>
    </div>
  );
}
