import React from 'react';
import PropTypes from "prop-types";

import memoryIcon      from "../../assets/images/memoryGame.png";
import translationIcon from "../../assets/images/translation.png";
import guessIcon       from "../../assets/images/guessTheWord.png";

const icons = {
  "memory game": memoryIcon,
  "translation": translationIcon,
  "guess the word": guessIcon,
};


export default function GameTypeButton({ gameType, isSelected, onClick }) {
  const nameKey = gameType.name?.toLowerCase().trim();
  const imgSrc = icons[nameKey];
  return (
    <button
  onClick={() => onClick(gameType._id)}
  className={`w-16 h-16 sm:w-16 sm:h-16 md:w-24 md:h-24 p-0 rounded-xl border-4 sm:border-4 overflow-hidden transition transform
    ${isSelected
      ? "border-yellow-500 shadow-md scale-105"
      : "border-gray-300 hover:scale-105"}
  `}
>
  <img
    src={imgSrc}
    alt={gameType.name}
    className="w-full h-full object-center"
    draggable={false}
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