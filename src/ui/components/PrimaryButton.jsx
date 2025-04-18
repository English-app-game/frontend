import React, { Children } from 'react';


const PrimaryButton = ({children}) => {
  return (
    <button className="font-sans bg-green-200 border-4 border-green-400 text-white font-extrabold text-lg px-8 py-3 rounded-full shadow-md hover:bg-green-300 active:translate-y-1 active:shadow-inner cursor-pointer transition-all duration-150">
    {children}
  </button>
  );
}

export default PrimaryButton;