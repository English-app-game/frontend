import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ text, onClick, disabled, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-sans bg-green-200 border-4 border-green-500 text-white font-extrabold text-lg px-8 py-3 rounded-full shadow-md hover:bg-green-300 active:translate-y-1 active:shadow-inner cursor-pointer transition-all duration-150 ${className}`}
    >
      {text}
    </button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default PrimaryButton;
