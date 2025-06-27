import { useNavigate } from "react-router-dom";
import {
  CREATE_ROOM,
} from "../../../routes/routes_consts";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import PrimaryButton from "../../components/PrimaryButton";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useWaitingRoomSocket } from "../../../hooks/useWaitingRoomSocket";
import { handleJoinRoomClick } from "../../../utils/handleJoinRoomClick";
import { validateLogin } from "../../../utils/validateFields";

export default function Footer({ rooms }) {
  const userId = useSelector((store) => store.user.id);
  const user = useSelector((store) => store.user);
  const { connectWithTimeout } = useWaitingRoomSocket();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [createError, setCreateError] = useState();
  
  async function handleJoinRoom(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const roomCode = formData.get("roomCode").trim();

    if (!roomCode) {
      setError("Please enter a room code");
      return;
    }

    handleJoinRoomClick({
      id: roomCode,
      currentPlayers: 0,
      capacity: 9999,
      onJoinAttempt: null,
      navigate,
      dispatch,
    });
  }

  function handleCreateRoomClick(e, setCreateError) {
    e.preventDefault();

    const isUserLoggedIn = validateLogin();
    if (!isUserLoggedIn) {
      setCreateError("Guest can't create a game!");
      return;
    }
    navigate(CREATE_ROOM);
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between gap-2 sm:justify-around px-3 py-2 bg-secondary z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col items-center">
        <PrimaryButton
          onClick={(e) => handleCreateRoomClick(e, setCreateError)}
          className="uppercase tracking-widest text-[0.7rem] sm:text-[0.8rem] px-3 py-2"
        >
          Create your <br /> private room
        </PrimaryButton>
        {createError && (
          <p className="text-red-600 text-sm mt-1">{createError}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-2 sm:gap-7">
        <div className="text-center text-lg sm:text-2xl">
          <p className="font-bold">OR</p>
          <p className="text-primary font-semibold text-[1rem] sm:text-sm">
            JOIN A PRIVATE ROOM:
          </p>
        </div>

        <form
          className="flex gap-2 items-center"
          action="#"
          onSubmit={handleJoinRoom}
        >
          <div className="flex flex-col justify-center items-center text-center gap-2">
            <InputField
              type="text"
              placeholder="Enter Room Code"
              name="roomCode"
              className={"w-48"}
            />
            {error && <p className="bg-red-200 rounded-full px-2">{error}</p>}
          </div>
          <PrimaryButton type="submit" className="p-2">
            <FaPlay />
          </PrimaryButton>
        </form>
      </div>
    </footer>
  );
}
