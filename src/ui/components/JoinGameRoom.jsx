import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import joinRoomIcon from "../../assets/images/joinRoomIcon.png";
import { useDispatch } from "react-redux";
import { handleJoinRoomClick } from "../../utils/handleJoinRoomClick";
import { useState, useEffect } from "react";
import { getAllGameTypes } from "../../services/room/roomType";
import guessIcon from "../../assets/images/guessTheWord.png";
import memoryIcon from "../../assets/images/memoryGame.png";
import translationIcon from "../../assets/images/translation.png";

const JoinGameRoom = ({
  id,
  currentPlayers,
  displayIndex,
  capacity,
  onJoinAttempt,
  className = "w-45",
  gameType,
}) => {
  const [gameThumbnails, setGameThumbnails] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadGameTypes() {
      const types = await getAllGameTypes();
      const thumbnailsMap = {};

      types.forEach((type) => {
        if (type.name === "guess the word") thumbnailsMap[type._id] = guessIcon;
        else if (type.name === "memory game")
          thumbnailsMap[type._id] = memoryIcon;
        else if (type.name === "translation")
          thumbnailsMap[type._id] = translationIcon;
      });

      setGameThumbnails(thumbnailsMap);
    }

    loadGameTypes();
  }, []);

  const handleClick = () => {
    handleJoinRoomClick({
      id,
      currentPlayers,
      capacity,
      onJoinAttempt,
      navigate,
      dispatch,
    });
  };

  return (
    <div
      className={`h-auto flex flex-col items-center hover:cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <p className="font-bold text-2xl">ROOM {displayIndex + 1}</p>
      <div className={`relative ${className} hover:shadow-none h-auto`}>
        <img
          src={gameThumbnails[gameType] || joinRoomIcon}
          alt={`${gameType} Room Icon`}
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
      <div className={`h-auto flex flex-col items-center mt-2 text-[1rem] sm:text-[1.5rem] text-black font-bold ${className}`}>
        <p>
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
