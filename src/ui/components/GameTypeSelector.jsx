import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllGameTypes } from "../../services/room/roomType.js";
import {BASE_GAMES_URL} from  "../../services/room/roomType.js";
import GameTypeButton from "../components/GameTypeButton.jsx";

const GameTypeSelector = ({ gameType, setGameType }) => {
  const [gameTypes, setGameTypes] = useState([]);

  useEffect(() => {
    getAllGameTypes()
    .then(data => setGameTypes(data))
    .catch(err => console.error(err));
  }, []);

  const handleClick = (id) => {
    setGameType(gameType === id ? null : id);
  };

  return (
    <div className="mb-6 w-full">
      <h1 className="text-lg font-extrabold mb-4 text-[#f5f5dc] uppercase text-center">1. Choose Game Type</h1>
      <div className="flex justify-around flex-wrap gap-4 max-w-full overflow-hidden">
        {gameTypes.length === 0 ? (
          <p className="text-white">No game types found.</p>
        ) : (
          gameTypes.map(gt => (
            <GameTypeButton
              key={gt._id}
              gameType={gt}
              isSelected={gameType === gt._id}
              onClick={handleClick}
            />
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
