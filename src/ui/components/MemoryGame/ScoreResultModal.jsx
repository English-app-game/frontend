import PrimaryButton from "../PrimaryButton";
import Header from "../Header";
import { useSelector } from "react-redux";

export default function ScoreResultModal({ onClose }) {
  const scoreboard = useSelector((state) => state.memoryGame.scoreboard);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 text-center">
        <Header text="🎉 GAME OVER 🎉" className="text-3xl font-extrabold text-rose-500 mb-4" />

        <h2 className="text-xl font-bold mb-2 text-gray-700">Final Scores:</h2>
        <ul className="text-gray-800 text-left mb-4">
          {scoreboard.map((player, index) => (
            <li
              key={player.userId}
              className={`mb-1 ${index === 0 ? "font-bold text-green-600" : ""}`}
            >
              {index + 1}. {player.name}: {player.score} pts
            </li>
          ))}
        </ul>

        <PrimaryButton
          onClick={onClose}
          className="bg-rose-300 border-4 border-orange-600 hover:bg-rose-400 w-full"
        >
          EXIT ROOM
        </PrimaryButton>
      </div>
    </div>
  );
}
