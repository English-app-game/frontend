import ExitButton from "../../../components/ExitButton";
import { ROUTES } from "../../../../routes/routes_consts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetRoom, setRoom } from "../../../../store/slices/roomSlice";
import { getRoom } from "../../../../services/room/getRoom";
import { useWaitingRoomSocket } from "../../../../hooks/useWaitingRoomSocket";
import { WAITING_ROOM_EVENTS } from "../../../../consts/socketEvents";
import removeUserFromRoom from "../../../../services/room/removeUserFromRoom";

const RoomHeader = () => {
  const navigate = useNavigate();
  const { id: roomKey } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { socket } = useWaitingRoomSocket();

  useEffect(() => {
    if (!roomKey) return;

    if (roomKey) {
      getRoom(roomKey).then((room) => dispatch(setRoom(room)));
    }
  }, [roomKey, dispatch]);

  const handleExit = async () => {
    if (!user || !user.id || !roomKey) {
      dispatch(resetRoom());
      return navigate(ROUTES.ROOMS_LIST);
    }

    await removeUserFromRoom(roomKey, user.id);
    socket.emit(WAITING_ROOM_EVENTS.LEAVE, { roomKey, userId: user.id });
    
    dispatch(resetRoom());
    navigate(ROUTES.ROOMS_LIST);
  };

  return (
    <>
      <div className="absolute top-4 left-4">
        <ExitButton
          onClick={handleExit}
          className="bg-rose-300 border-4 border-orange-600 hover:bg-rose-400"
        >
          EXIT ROOM
        </ExitButton>
      </div>
      <h1 className="text-4xl font-extrabold text-teal-600 mb-10 uppercase drop-shadow-md text-center">
        WAITING ROOM
      </h1>
    </>
  );
};

export default RoomHeader;
