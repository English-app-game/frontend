import PropTypes from "prop-types";
import ExitButton from "../../../components/ExitButton";
import SecondaryButton from "../../../components/SecondaryButton";
import { ROUTES } from "../../../../routes/routes_consts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetRoom, setRoom } from "../../../../store/slices/roomSlice";
import { getRoom } from "../../../../services/room/getRoom";
import { FiMenu, FiX } from "react-icons/fi";
import { WindowBody } from "../../../components/WindowBody";
import { IconButton } from "../../../components/IconButton";
import UserInfoHeader from "../../../components/UserInfoHeader";
import { MobileSideBar } from "../../../components/MobileSideBar";

const RoomHeader = ({ exitRoom }) => {
  const navigate = useNavigate();
  const { id: roomKey } = useParams();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!roomKey) return;

    if (roomKey) {
      getRoom(roomKey).then((room) => dispatch(setRoom(room)));
    }
  }, [roomKey, dispatch]);

  const handleExit = async () => {
    if (exitRoom) {
      // Use the comprehensive exit function from parent
      await exitRoom();
    } else {
      // Fallback to navigate if exitRoom is not provided
      dispatch(resetRoom());
      navigate(ROUTES.ROOMS_LIST);
    }
  };

  return (
    <>
      <div className="flex sm:block px-4 py-4 sm:py-6">
        <SecondaryButton text={"EXIT ROOM"} onclick={handleExit} />
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

RoomHeader.propTypes = {
  exitRoom: PropTypes.func,
};

export default RoomHeader;
