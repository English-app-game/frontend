
import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ text, className = '' }) => {
  return (
    <h1 className={`text-4xl font-bold text-[#f5f5dc] font-sans ${className}`}>
      {text}
    </h1>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Header;
