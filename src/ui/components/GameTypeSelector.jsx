import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const GameTypeSelector = ({ gameType, setGameType }) => {
  const [gameTypes, setGameTypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/game-types")
      .then(res => res.json())
      .then(data => {
        console.log("🎮 Game types:", data); 
        setGameTypes(data);
      })
      .catch(err => console.error("❌ Error fetching game types:", err));
  }, []);

  return (
    <div className="mb-6 w-full">
      <h1 className="text-lg font-extrabold mb-4 text-[#f5f5dc] uppercase text-center">1. Choose Game Type</h1>
      <div className="flex justify-around flex-wrap gap-4 max-w-full overflow-hidden">
        {gameTypes.length === 0 ? (
          <p className="text-white">No game types found.</p>
        ) : (
          gameTypes.map(gt => (
            <button
              key={gt._id}
              onClick={() => setGameType(gameType === gt._id ? null : gt._id)}
              className={`px-4 py-2 rounded-lg font-bold text-white border-4 transition text-sm ${
                gameType === gt._id
                  ? "bg-blue-500 border-blue-700 ring-4 ring-blue-300 scale-105"
                  : "bg-gray-500 border-gray-300"
              }`}
            >
              {gt.name || "Unnamed Game"}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

GameTypeSelector.propTypes = {
  gameType: PropTypes.string,
  setGameType: PropTypes.func.isRequired,
};

export default GameTypeSelector;
