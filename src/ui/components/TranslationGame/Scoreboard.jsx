import { useSelector } from "react-redux";

export default function ScoreBoard() {
  const scoreboard = useSelector((store) => store.translationGame.scoreboard);
  const userId = useSelector((store) => store.user.id);

  const currentUser = scoreboard.find((entry) => entry.userId === userId);

  return (
    <div className="bg-red-100 px-6 py-4 w-full rounded-b-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-red-800">לוח תוצאות</h2>
        {currentUser && (
          <div className="bg-white text-red-700 px-4 py-2 rounded-xl shadow text-sm font-medium">
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
              className={`flex items-center gap-x-2 px-3 py-2 rounded-xl shadow-sm ${
                isCurrent ? "border-2 border-red-600" : ""
              }`}
              style={{ backgroundColor: color }}
            >
              <span className="font-medium">{name}</span>
              <span className="font-bold">{score}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
