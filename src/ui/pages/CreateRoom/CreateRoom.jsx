import React, { useEffect, useState } from "react";
import LevelSelector from "./LevelSelector";
import StatusSelector from "./StatusSelector";
import PrimaryButton from "../../../ui/components/PrimaryButton";
import BlueBox from "../../../ui/components/BlueBox";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../../store/thunks/createRoomThunk";
import { WAITING_ROOM } from "../../../routes/routes_consts";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "@hooks/useAuthRedirect";
import GameTypeSelector from "../../components/GameTypeSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TEMP_USER = {
  // this user ID has to be real ID from db.
  _id: "681f7a077d51665473dbe491",
  name: "Alice Example",
  email: "alice@example.com",
  password: "securePassword123!",
  avatarImg: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice",
  lastLogin: new Date().toISOString(),
};

const CreateRoom = () => {

  const [level, setLevel] = useState(null);
  const [status, setStatus] = useState(null);
  const [gameType, setGameType] = useState(null);

  const navigate = useNavigate();

  const roomKey = useSelector((store) => store.room.key);
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleCreateRoom = () => {
    if (!level || !status|| !gameType) {
      toast.error("Please select game type, level and status!");
      return;
    }
    dispatch(createRoom({ key:null, users: user.id, level, status, gameType, admin: user.id })
    );
  };

  useEffect(() => {
    if (!roomKey) return;

    navigate(WAITING_ROOM(roomKey));
  }, [roomKey, navigate]);

  return (
    <div className="bg-[url('/homePage.png')] bg-cover min-h-screen flex items-center justify-center px-4">
     <BlueBox size="large" className="text-center w-[50rem] min-h-[40rem] p-4 overflow-y-auto max-h-[95vh]">
        <Header
          className="text-4xl font-extrabold mb-6 uppercase"
          text={`CREATE YOUR GAME ROOM`}
        ></Header>
        <GameTypeSelector gameType={gameType} setGameType={setGameType} />
        <LevelSelector level={level} setLevel={setLevel} />
        <StatusSelector status={status} setStatus={setStatus} />
        <PrimaryButton
          text="LET'S GO"
          onClick={handleCreateRoom}
          className="bg-green-400 px-4 py-2"
        />
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      </BlueBox>
    </div>
  );
};

export default CreateRoom;
