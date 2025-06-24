import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import joinRoomIcon from "../../assets/images/joinRoomIcon.png";
import { useDispatch } from "react-redux";
import { handleJoinRoomClick } from "../../utils/handleJoinRoomClick";

const JoinGameRoom = ({
  id,
  currentPlayers,
  displayIndex,
  capacity,
  onJoinAttempt,
  className = "w-45",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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