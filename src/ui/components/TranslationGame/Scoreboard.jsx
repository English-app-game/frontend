import { useSelector } from "react-redux";

export default function ScoreBoard() {
  const scoreboard = useSelector((store) => store.translationGame.scoreboard);
  const userId = useSelector((store) => store.user.id);

  const currentUser = scoreboard.find((entry) => entry.userId === userId);

  return (
    <div className="flex flex-col gap-3 px-4 py-3 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-red-800">לוח תוצאות</h2>
        {currentUser && (
          <div className="bg-white text-red-700 px-3 py-1 rounded-md shadow text-sm font-medium">
            הציון שלך: <span className="font-bold">{currentUser.score}</span>
          </div>
        )}
      </div>

      <ul className="flex flex-wrap gap-2">
        {scoreboard.map(({ userId, name, score, color }) => {
          const isCurrent = userId === currentUser?.userId;
          return (
            <li
              key={userId}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-sm text-sm font-medium ${
                isCurrent ? "ring-2 ring-red-600" : ""
              }`}
              style={{ backgroundColor: color || "#f0f0f0" }}
            >
              <span>{name}</span>
              <span className="font-bold">{score}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
