import React from 'react';
import PropTypes from 'prop-types';

const BlueBox = ({ children, className = "", size = "medium" }) => {
  const boxSizes = {
    small: "max-w-md",
    medium: "max-w-md mx-auto",
    large: "w-[45rem] h-[24rem]"
  };

  const sizeClass = boxSizes[size] || boxSizes.medium;

  return (
    <div className={`min-h-[400px] bg-[#137f95] rounded-xl p-8 shadow-lg ${sizeClass} ${className}`}>
      {children}
    </div>
  );
};

BlueBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default BlueBox;
