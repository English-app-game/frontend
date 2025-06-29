import PropTypes from "prop-types";
import memoryGameCard from "../../../assets/images/memoryGameCard.png"

export default function WordCard({ word, isRevealed, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-[7rem] h-[8.75rem] bg-sky-200 rounded-xl border-2 border-gray-300 flex items-center justify-center text-xl font-semibold cursor-pointer transition-transform hover:scale-105"
    >
      {isRevealed ? (
        <div className="text-black text-center px-2">{word}</div>
      ) : (
        <img src={memoryGameCard} alt="card back" className="w-full h-full rounded-xl" />
      )}
    </div>
  );
}

WordCard.propTypes = {
  word: PropTypes.string.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}; 