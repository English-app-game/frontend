import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import joinRoomIcon from "../../assets/images/joinRoomIcon.png";
import { joinUserToRoom } from "../../services/room/joinUserToRoom";
import { getStoredUser } from "../../hooks/useAuthRedirect";
import { ROOMS_LIST } from "../../routes/routes_consts";

const JoinGameRoom = ({
  id,
  currentPlayers,
  displayIndex,
  capacity,
  onJoinAttempt,
  className = "w-45",
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (currentPlayers >= capacity) {
      if (onJoinAttempt) {
        onJoinAttempt({ id, full: true });
      } else {
        alert("This room is full!");
      }
      return;
    }

    const user = getStoredUser();

    if (!user || !user.id) {
      alert("User not found. Please log in.");
      return;
    }

    const isGuest = user.isGuest || typeof user.id === 'string' && user.id.length !== 24;
    
    const handleJoinError = () => {
      navigate(ROOMS_LIST);
    };
    
    if (isGuest) {
      const guestData = {
        id: user.id,
        name: user.name,
        avatarImg: user.avatarImg
      };
      await joinUserToRoom(id, user.id, guestData, handleJoinError);
    } else {
      await joinUserToRoom(id, user.id, null, handleJoinError);
    }

    if (onJoinAttempt) {
      onJoinAttempt({ id, full: false });
    }

    navigate(`/rooms/${id}`);
  };

  return (
    <div
      className={`h-auto flex flex-col items-center hover:cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <p className="font-bold text-2xl">ROOM {displayIndex + 1}</p>
      <div
        className={`relative ${className}  shadow-md hover:shadow-none h-auto`}
      >
        <img
          src={joinRoomIcon}
          alt="Join Room Icon"
          className="w-full h-full object-cover rounded-lg"
        />
        <p className="absolute sm:bottom-4 sm:left-6 text-black text-[1rem] sm:text-[1.5rem] bottom-0 left-0 translate-x-4 -translate-y-1/2 font-bold">
          {currentPlayers}/{capacity} PLAYERS
        </p>
      </div>
    </div>
  );
};

JoinGameRoom.propTypes = {
  id: PropTypes.string.isRequired,
  displayIndex: PropTypes.number.isRequired,
  currentPlayers: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  onJoinAttempt: PropTypes.func,
};

export default JoinGameRoom;