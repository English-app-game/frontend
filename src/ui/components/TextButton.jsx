import React from 'react';
import PropTypes from 'prop-types';

const TextButton = ({onClick, disabled, className, children}) => {
  return (
    <button onClick={onClick} disabled={disabled}
    className={`text-blue-800 text-base block w-fit hover:text-blue-200 transition-colors duration-200
    active:scale-95 focus:outline-none ${className}`}>{children} </button>
  );
};

TextButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default TextButton