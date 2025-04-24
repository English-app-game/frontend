import React from 'react';
import PropTypes from 'prop-types';

const ExitButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className='font-sans bg-rose-300 border-4 border-orange-600 text-white font-extrabold text-lg px-8 py-3 rounded-full shadow-md hover:bg-rose-300 
      active:translate-y-1 active:shadow-inner cursor-pointer transition-all duration-150'>{children}</button>
  );
};

ExitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ExitButton;
