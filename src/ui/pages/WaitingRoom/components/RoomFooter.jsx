import PropTypes from "prop-types";
import ExitButton from "../../../components/ExitButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleExitWaitingRoom } from "../../../../utils/handleExitWaitingRoom";
import { useWaitingRoomSocket } from "../../../../hooks/useWaitingRoomSocket.js";


const RoomFooter = ({exitRoom, copied, handleCopy, handleStart, roomKey }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="mt-5 sm:mb-5 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
      <div className="text-shadow-md font-extrabold text-teal-700">
        ROOM KEY:
      </div>
      <div className="relative bg-gray-200 text-xl px-6 py-2 rounded-full font-bold text-black text-center break-words max-w-xs sm:max-w-none">
        {roomKey}
        <button
          onClick={handleCopy}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:underline sm:static sm:translate-y-0 sm:ml-2 sm:inline-block sm:mt-0 mt-2"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex gap-4">
        <ExitButton
          className="sm:hidden w-full sm:w-auto text-center bg-rose-600 mb-7 sm:mb-0 border-4 border-rose-400"
          onClick={() =>
            handleExitWaitingRoom(exitRoom, navigate, dispatch)
          }
        >
          EXIT ROOM
        </ExitButton>
        <ExitButton
          onClick={handleStart}
          className="w-full sm:w-auto text-center bg-green-300 border-green-400 hover:bg-green-400 mb-7 sm:mb-0"
        >
          START ▶
        </ExitButton>
      </div>
    </div>
  );
};

RoomFooter.propTypes = {
  copied: PropTypes.bool.isRequired,
  handleCopy: PropTypes.func.isRequired,
  handleStart: PropTypes.func.isRequired,
  roomKey: PropTypes.string.isRequired,
};

export default RoomFooter;
