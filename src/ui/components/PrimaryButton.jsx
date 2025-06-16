import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ children, text, onClick, disabled, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-sans bg-green-700 border-4 border-green-200 text-white font-extrabold text-lg sm:px-8 sm:py-3 rounded-full shadow-md hover:bg-green-400 active:translate-y-1 active:shadow-inner cursor-pointer transition-all duration-150 ${className}`}
    >
      {text}
      {children}
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
