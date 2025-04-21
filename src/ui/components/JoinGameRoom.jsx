import React from 'react'
import { useNavigate } from 'react-router-dom';
import joinRoomIcon from "../../assets/images/joinRoomIcon.png";

const JoinGameRoom = ({ index, currentPlayers, capacity }) => {
    const navigate = useNavigate();

    return (
        <div className='w-45 h-auto flex flex-col items-center hover:cursor-pointer' 
        onClick={() => navigate(`/rooms/${index}`)}
        >
            <p className='font-bold text-2xl'>ROOM {index + 1}</p>         {/* i need to add the {room index} acordding to the room that exist */}
            <div className="relative w-45 h-auto">
                <img
                    src={joinRoomIcon}
                    alt="Join Room Icon"
                    className="w-full h-full object-cover rounded-lg"
                />
                <p className="absolute bottom-4 left-6 text-black text-[20px] font-bold">
                {currentPlayers}/{capacity} PLAYERS
                </p>
            </div>

            {/* need to add the room capacity and how much players are in the room */}

        </div>
    )
}

export default JoinGameRoom