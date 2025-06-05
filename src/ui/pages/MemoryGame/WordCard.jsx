import PropTypes from "prop-types";
import questionImg from "../../../assets/images/question-sign.png";

export default function WordCard({ word, isRevealed, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-[7rem] h-[8.75rem] bg-white rounded-xl border-2 border-gray-300 flex items-center justify-center text-xl font-semibold cursor-pointer transition-transform hover:scale-105"
    >
      {isRevealed ? (
        <div className="text-indigo-400 text-lg font-semibold tracking-wide drop-shadow-sm">{word}</div>
      ) : (
        <img src={questionImg} alt="card back" className="w-10 h-10" />
      )}
    </div>
  );
}

WordCard.propTypes = {
  word: PropTypes.string.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
