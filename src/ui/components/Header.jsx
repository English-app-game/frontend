import React, { Children } from 'react';


const Header = ({ children }) => {
    return (
      <div className="flex justify-center h-screen px-10">
        <h1 className="text-4xl font-bold text-[#f5f5dc] font-sans">
          {children}
        </h1>
      </div>
    );
  };

  export default Header;