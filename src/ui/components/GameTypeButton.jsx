import React from 'react';
import PropTypes from "prop-types";


export default function GameTypeButton({ gameType, isSelected, onClick }) {
  return (
    <button
      onClick={() => onClick(gameType._id)}
      className={`px-4 py-2 rounded-lg font-bold text-white border-4 transition text-sm ${
        isSelected
          ? "bg-blue-500 border-blue-700 ring-4 ring-blue-300 scale-105"
          : "bg-gray-500 border-gray-300"
      }`}
    >
      {gameType.name || "Unnamed Game"}
    </button>
  );
}

GameTypeButton.propTypes = {
  gameType: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};