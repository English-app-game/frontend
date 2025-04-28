import JoinGameRoom from "../components/JoinGameRoom";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { CREATE_ROOM, WAITING_ROOM } from "../../routes/routes_consts";
import { useState } from "react";
import { GiGameConsole } from "react-icons/gi";
import { IoGameControllerOutline } from "react-icons/io5";


// rooms temp data

const rooms = Array.from({ length: 10 }, (_, index) => index);

export default function ServersRoom() {

  const navigate = useNavigate();

  const [error, setError] = useState('')


  function handleJoinRoom(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const roomCode = Number(formData.get('roomCode'));

    console.log(roomCode)
    console.log(rooms.includes(roomCode))
    if (rooms.includes(roomCode))
      navigate(WAITING_ROOM(roomCode));

    setError('Invalid Room Code');
  }

  function handleCreateRoomClick(e) {
    e.preventDefault();

    navigate(CREATE_ROOM);
  }

  return (
    <div className="flex flex-col h-screen bg-secondary relative">
      {/* Fixed Header */}
      <header className="flex items-center justify-center gap-5 h-16 py-7 sm:py-10 bg-secondary z-50 shadow-md">
        <Header text="Join a game room" className="text-primary uppercase text-[1.5rem] sm:text-4xl" />
        <IoGameControllerOutline size={80} />

      </header>

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
        {rooms.map((_, index) => <JoinGameRoom
          id={index}
          currentPlayers={2}
          capacity={5}
          key={index}
          className="w-32 sm:w-52"
        />)}
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between sm:justify-around px-3 py-2 bg-secondary z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <PrimaryButton onClick={handleCreateRoomClick} className="uppercase tracking-widest text-[0.8rem] px-3 py-2">
          Create your <br /> private room
        </PrimaryButton>

        <div className="flex flex-col sm:flex-row items-center justify-around gap-2 sm:gap-7">
          <div className="text-center text-lg sm:text-2xl">
            <p className="font-bold">OR</p>
            <p className="text-primary font-semibold">JOIN A PRIVATE ROOM:</p>
          </div>

          <form className="flex flex-col text-center gap-2" action="#" onSubmit={handleJoinRoom}>

            <input
              type="text"
              placeholder="Enter room code"
              className="rounded-lg border border-primary bg-white px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              name="roomCode"
            />
            {error && <p className="bg-red-200 rounded-full" >Invalid Room Code</p>}
          </form>

        </div>
      </footer>

    </div>
  );
}
