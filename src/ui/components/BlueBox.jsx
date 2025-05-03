import React from 'react';
import PropTypes from 'prop-types';

const BlueBox = ({ children, className = "", override = false }) => {
  const defaultClasses = "min-h-[400px] bg-[#137f95] rounded-xl p-8 w-full max-w-md mx-auto shadow-lg";

  return (
    <div className={`${override ? className : `${defaultClasses} ${className}`}`}>
      {children}
    </div>
  );
};

BlueBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  override: PropTypes.bool, 
};

export default BlueBox;
