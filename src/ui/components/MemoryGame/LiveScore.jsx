import React from "react";
import { useSelector } from "react-redux";

export default function LiveScore() {
  const game = useSelector((state) => state.memoryGame);
  const user = useSelector((state) => state.user);

  if (!game?.scoreboard?.length) return null;

  return (
    <div className="fixed top-4 right-4 sm:top-2 sm:right-2 bg-white/80 p-4 sm:p-2 rounded-xl shadow-md z-10 max-w-[90vw] text-sm sm:text-xs">
      <h2 className="text-xl font-bold mb-2 text-black">🏆 Scores</h2>
      {game.scoreboard.map((player) => (
        <div key={player.userId} className="text-black">
          <span
            style={{ color: player.color || "#000" }}
            className={`font-semibold ${player.userId === user.id ? "underline" : ""}`}
          >
            {player.name}:
          </span>{" "}
          {player.score} pts
        </div>
      ))}
    </div>
  );
}