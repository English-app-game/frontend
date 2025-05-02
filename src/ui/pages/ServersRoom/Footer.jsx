import { useNavigate } from "react-router-dom";
import { CREATE_ROOM, WAITING_ROOM } from "../../../routes/routes_consts";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

export default function Footer({ rooms }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleJoinRoom(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const roomCode = Number(formData.get("roomCode"));

    if (rooms.includes(roomCode)) return navigate(WAITING_ROOM(roomCode));

    setError("Invalid Room Code");
  }

  function handleCreateRoomClick(e) {
    e.preventDefault();

    navigate(CREATE_ROOM);
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between sm:justify-around px-3 py-2 bg-secondary z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <PrimaryButton
        onClick={handleCreateRoomClick}
        className="uppercase tracking-widest text-[0.8rem] px-3 py-2"
      >
        Create your <br /> private room
      </PrimaryButton>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-2 sm:gap-7">
        <div className="text-center text-lg sm:text-2xl">
          <p className="font-bold">OR</p>
          <p className="text-primary font-semibold">JOIN A PRIVATE ROOM:</p>
        </div>

        <form
          className="flex flex-col text-center gap-2"
          action="#"
          onSubmit={handleJoinRoom}
        >
          <input
            type="text"
            placeholder="Enter room code"
            className="rounded-lg border border-primary bg-white px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            name="roomCode"
          />
          {error && (
            <p className="bg-red-200 rounded-full">Invalid Room Code</p>
          )}
        </form>
      </div>
    </footer>
  );
}
