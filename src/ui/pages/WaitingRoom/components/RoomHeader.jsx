import PropTypes from "prop-types";
import SecondaryButton from "../../../components/SecondaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRoom } from "../../../../store/slices/roomSlice";
import { getRoom } from "../../../../services/room/getRoom";
import { FiMenu, FiX } from "react-icons/fi";
import { WindowBody } from "../../../components/WindowBody";
import { IconButton } from "../../../components/IconButton";
import UserInfoHeader from "../../../components/UserInfoHeader";
import { MobileSideBar } from "../../../components/MobileSideBar";
import Header from "../../../components/Header";
import { handleExitWaitingRoom } from "../../../../utils/handleExitWaitingRoom.js";

const RoomHeader = ({ exitRoom, HeaderIcon, HeaderText }) => {
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

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-center gap-5 h-16 py-7 md:py-10 z-50">
      <div className="flex justify-center w-full md:justify-center">
        <div className="flex items-center justify-center gap-2">
          <Header
            text={HeaderText}
            className="text-primary top-0 uppercase text-[1.5rem] md:text-4xl"
          />
          <HeaderIcon size={40} className="text-primary" />
        </div>
        <div className="md:flex absolute left-8 top-1/2 -translate-y-1/2">
          <SecondaryButton
            text={"EXIT ROOM"}
            onclick={() => handleExitWaitingRoom(exitRoom, navigate, dispatch)}
            className={"hidden sm:block"}
          />
        </div>
        <div className="hidden sm:block">
          <UserInfoHeader />
        </div>
      </div>
      <IconButton
        className={
          "md:hidden text-primary text-3xl absolute pb-3 right-4 top-1/2 -translate-y-1/2"
        }
        onClick={() => setIsOpen(true)}
        Icon={FiMenu}
      />
      <MobileSideBar isOpen={isOpen}>
        <IconButton
          className={"text-primary text-3xl mb-6 ml-auto"}
          onClick={() => setIsOpen(false)}
          Icon={FiX}
        />
        <WindowBody className={"flex flex-col items-end gap-4"}>
          <UserInfoHeader isInsideSidebar={true} />
        </WindowBody>
      </MobileSideBar>
    </header>
  );
};

RoomHeader.propTypes = {
  exitRoom: PropTypes.func,
};

export default RoomHeader;
