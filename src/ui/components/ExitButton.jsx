import React from 'react';
import PropTypes from 'prop-types';

const ExitButton = ({ onClick, children, className = ""  }) => {
  return (
    <button onClick={onClick} className={`font-sans text-white font-extrabold text-lg px-8 py-3 rounded-full shadow-md  
      active:translate-y-1 active:shadow-inner cursor-pointer transition-all duration-150 ${className}`}>{children}</button>
  );
};

ExitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default ExitButton;
