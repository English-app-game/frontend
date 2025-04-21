import React from 'react'
import { useNavigate } from 'react-router-dom';

const ExitButton = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/rooms'); 
  };

  return (
   <button onClick={handleExit} className='`font-sans bg-rose-300 border-4 border-orange-600 text-white font-extrabold text-lg px-8 py-3 rounded-full shadow-md hover:bg-rose-300 active:translate-y-1 active:shadow-inner
    cursor-pointer transition-all duration-150'>EXIT ROOM</button>
  )
}

export default ExitButton