import React from 'react';
import PropTypes from "prop-types";

import memoryIcon      from "../../../public/memoryGame.png";
import translationIcon from "../../../public/guessTheWord.png";
import guessIcon       from "../../../public/translation.png";

const icons = {
  "memory game": memoryIcon,
  "translation": guessIcon,
  "guess the word": translationIcon,
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