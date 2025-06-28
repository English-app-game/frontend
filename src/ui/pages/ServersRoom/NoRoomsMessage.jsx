import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_ROOM } from "../../../routes/routes_consts";
import { validateLogin } from "../../../utils/validateFields";
import WarningP from "../../components/WarningP";

export default function NoRoomsMessage() {
  const navigate = useNavigate();
  const [createError, setCreateError] = useState();

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
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <p className="text-2xl sm:text-3xl font-bold mb-4 text-primary">
        Uh-oh... no game rooms yet!
      </p>
      <p className="text-lg sm:text-xl mb-6">
        Be the first to start one and invite your friends 🎉
      </p>
      <button
        onClick={(e) => handleCreateRoomClick(e, setCreateError)}
        className="bg-primary text-white px-6 py-3 rounded-2xl shadow-lg text-sm sm:text-base hover:bg-opacity-80 hover:scale-105 hover:cursor-pointer hover:shadow-2xl transition"
      >
        Create a New Room 🚀
      </button>
      {createError && (
        <WarningP children={createError}/>
      )}
    </div>
  );
}
