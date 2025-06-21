export default function ScoreboardList({ scoreboard }) {
  return (
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
  );
}
