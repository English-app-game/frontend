import React from "react";
import { useSelector } from "react-redux";

export default function LiveScore() {
  const game = useSelector((state) => state.memoryGame);
  const user = useSelector((state) => state.user);

  if (!game?.scoreboard?.length) return null;

  return (
    <div className="flex-wrap items-start w-140 relative mx-10 top-4 right-4 sm:top-2 sm:right-2 p-4 sm:p-2 rounded-xl backdrop-blur-md border border-white/20 shadow-md z-10 max-w-[90vw] text-sm sm:text-xs">
      <div className="px-5 pb-3">
        <h2 className="text-xl font-bold text-white">Scores Board 🏆</h2>
      </div>
      <div className="flex flex-wrap px-5">
        {game.scoreboard.map((player) => (
          <div key={player.userId} className="text-white text-sm mr-5 p-1">
            <span
              className={`font-semibold text-white ${
                player.userId === user.id ? "underline" : ""
              }`}
            >
              {player.name}:
            </span>{" "}
            {player.score} pts
          </div>
        ))}
      </div>
    </div>
  );
}
