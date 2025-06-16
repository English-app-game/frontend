import ExitButton from "../../../components/ExitButton";
import { ROUTES } from "../../../../routes/routes_consts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetRoom, setRoom } from "../../../../store/slices/roomSlice";
import { getRoom } from "../../../../services/room/getRoom";
import { useWaitingRoomSocket } from "../../../../hooks/useWaitingRoomSocket";
import { WAITING_ROOM_EVENTS } from "../../../../consts/socketEvents";
import removeUserFromRoom from "../../../../services/room/removeUserFromRoom";
import { FiMenu, FiX } from "react-icons/fi";
import { WindowBody } from "../../../components/WindowBody";
import { IconButton } from "../../../components/IconButton";
import UserInfoHeader from "../../../components/UserInfoHeader";
import { MobileSideBar } from "../../../components/MobileSideBar";

const RoomHeader = () => {
  const navigate = useNavigate();
  const { id: roomKey } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { socket } = useWaitingRoomSocket()
  const [isOpen, setIsOpen] = useState(false);


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
      <div className="flex sm:block px-4 py-4 sm:py-6">
        <ExitButton
          onClick={handleExit}
          className="bg-rose-600 border-4 border-rose-400 hover:bg-rose-400 text-xs sm:text-base px-3 py-2 sm:px-5 sm:py-3 
        sm:absolute sm:left-4"
        >
          EXIT ROOM
        </ExitButton>

        <h1 className="text-lg sm:text-4xl font-extrabold text-teal-600 uppercase drop-shadow-md text-center px-2 break-words flex-1">
          WAITING ROOM
        </h1>

        <div className="sm:hidden">
          <IconButton
            className="text-primary text-3xl"
            onClick={() => setIsOpen(true)}
            Icon={FiMenu}
          />
        </div>
      </div>

      <MobileSideBar isOpen={isOpen}>
        <IconButton
          className="text-primary text-3xl mb-6 ml-auto"
          onClick={() => setIsOpen(false)}
          Icon={FiX}
        />
        <WindowBody className="flex flex-col items-end gap-4">
          <UserInfoHeader isInsideSidebar={true} />
        </WindowBody>
      </MobileSideBar>
    </>
  );
};

export default RoomHeader;
