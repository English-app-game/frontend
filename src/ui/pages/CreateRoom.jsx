import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes_consts';
import PrimaryButton from '../components/PrimaryButton';

import easyImg from '../../assets/images/easy-level.png';
import mediumImg from '../../assets/images/medium-level.png';
import hardImg from '../../assets/images/hard-level.png';

const levelOptions = {
  easy: {
    label: 'EASY',
    img: easyImg,
  },
  medium: {
    label: 'MEDIUM',
    img: mediumImg,
  },
  hard: {
    label: 'HARD',
    img: hardImg,
  },
};

const statusOptions = {
  private: {
    label: 'PRIVATE',
    bgColor: 'bg-rose-400',
    borderColor: 'border-rose-600',
    hoverColor: 'hover:bg-rose-300',
    ringColor: 'ring-rose-600',
  },
  public: {
    label: 'PUBLIC',
    bgColor: 'bg-green-400',
    borderColor: 'border-green-600',
    hoverColor: 'hover:bg-green-300',
    ringColor: 'ring-green-600',
  },
};

const CreateRoom = () => {
  const [level, setLevel] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!level || !status) {
      alert("Please select both level and status");
      return;
    }
    navigate(ROUTES.WAITING_ROOM(), { state: { level, status } });
  };

  return (
    <div className=" bg-[#B2F8F5] min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-[#068E9E] mb-6 uppercase">CREATE YOUR GAME ROOM</h1>

        <div className="mb-6">
          <h1 className="text-lg font-extrabold mb-4 text-[#068E9E] uppercase">1. Choose Level</h1>
          <div className="flex justify-around">
            {Object.entries(levelOptions).map(([key, { label, img }]) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <p className="text-md font-extrabold text-[#070b0b]">{label}</p>
                <button onClick={() => setLevel(level === key ? null : key)} className={`w-21 h-20 rounded-lg border-4 shadow-md transition hover:scale-105
                  ${level === key ? 'border-teal-500' : 'border-white'}`}>
                  <img src={img} alt={label} className="w-full h-full object-contain" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-lg font-extrabold mb-2 text-[#068E9E] uppercase">2. CHOOSE STATUS</h1>
          <div className="flex justify-around">
            {Object.entries(statusOptions).map(([key, { label, bgColor, borderColor, hoverColor, ringColor }]) => (
              <PrimaryButton
                key={key}
                text={label}
                onClick={() => setStatus(status === key ? null : key)}
                className={`px-6 py-2 rounded-full font-extrabold text-white transition shadow-md ${bgColor} ${hoverColor} ${borderColor} border-4
                ${status === key ? `ring-4 ${ringColor} scale-105` : ''}`}
              />
            ))}
          </div>
        </div>
        <PrimaryButton text="LET'S GO" onClick={handleCreateRoom} className='bg-green-400' />
      </div>
    </div>
  );
};

export default CreateRoom;
