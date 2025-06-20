import PropTypes from "prop-types";

const ButtonGuessWord = ({ text, onClick, disabled = false, className = "" }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`${className}`}> {text} </button>
  );
};

ButtonGuessWord.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default ButtonGuessWord;
