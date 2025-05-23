import { useNavigate } from "react-router-dom";
import {
  CREATE_ROOM,
  HOME,
  LOGIN,
  WAITING_ROOM,
} from "../../../routes/routes_consts";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import PrimaryButton from "../../components/PrimaryButton";
import InputField from "../../components/InputField";

export default function Footer({ rooms }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

   function handleJoinRoom(e) { 
    e.preventDefault();

    const formData = new FormData(e.target);

    if (!formData.get("roomCode")) return;

    const roomCode = Number(formData.get("roomCode"));

    if (rooms.includes(roomCode)) return navigate(WAITING_ROOM(roomCode));

    setError("Invalid Room Code");
  }

  function handleCreateRoomClick(e) {
    e.preventDefault();

    // TEMP FUNCTION -- WAITING FOR validateLogin code
    function validateLogin() {
      // ...
      // probabily check if (user.loggedIn === true && user.isGuest === false) in (soon to be?) user slice in redux store.
      // currently return true to not break development flow
      return true;
    }

    const isUserLoggedIn = validateLogin();
    if (!isUserLoggedIn) {
      navigate(LOGIN);
      return;
    }
    navigate(CREATE_ROOM);
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between gap-2 sm:justify-around px-3 py-2 bg-secondary z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <PrimaryButton
        onClick={handleCreateRoomClick}
        className="uppercase tracking-widest text-[0.7rem] sm:text-[0.8rem] px-3 py-2"
      >
        Create your <br /> private room
      </PrimaryButton>

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
            {error && (
              <p className="bg-red-200 rounded-full px-2">Invalid Room Code</p>
            )}
          </div>
          <PrimaryButton type="submit" className="p-2">
            <FaPlay />
          </PrimaryButton>
        </form>
      </div>
    </footer>
  );
}
