import React from 'react';
import PropTypes from 'prop-types';

const BlueBox = ({ children }) => {
  return (
    <div className="min-h-[400px] bg-[#137f95] rounded-xl p-8 w-full max-w-md mx-auto shadow-lg">
      {children}
    </div>
  );
};

BlueBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlueBox;
