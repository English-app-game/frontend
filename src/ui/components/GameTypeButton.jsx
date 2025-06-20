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
  console.log('👉 gameType.name:', `"${gameType.name}"`);
  const nameKey = gameType.name?.toLowerCase().trim();
  const imgSrc = icons[nameKey];
  return (
    <button
  onClick={() => onClick(gameType._id)}
  className={`w-20 h-20 p-0 rounded-xl border-4 overflow-hidden transition transform
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