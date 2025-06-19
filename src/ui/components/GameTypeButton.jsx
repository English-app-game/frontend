import React from 'react';
import PropTypes from "prop-types";

import memoryIcon      from "../../../public/memoryGame.png";
import translationIcon from "../../../public/guessTheWord.png";
import guessIcon       from "../../../public/translation.png";

const icons = {
  "memory game": memoryIcon,
  translation: translationIcon,
  "guess the word": guessIcon,
};


export default function GameTypeButton({ gameType, isSelected, onClick }) {
  const imgSrc = icons[gameType.name?.toLowerCase()] || memoryIcon;
  return (
    <button
      onClick={() => onClick(gameType._id)}
     className={`rounded-xl border-4 overflow-hidden
        transition transform
        ${isSelected
          ? "border-blue-700 ring-4 ring-blue-300 scale-105"
          : "border-gray-300 hover:scale-105"}
      `}
       style={{
        width: "80px",
        height: "80px",
        padding: 0,
      }}
    >
       <img
        src={imgSrc}
        alt={gameType.name}
       className="w-full h-full object-contain"
      />
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