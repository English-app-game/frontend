import React, { useState } from "react";
import LevelSelector from "./LevelSelector";
import StatusSelector from "./StatusSelector";
import PrimaryButton from "../../../ui/components/PrimaryButton";
import BlueBox from "../../../ui/components/BlueBox";
import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import { createRoom } from "../../../store/thunks/createRoomThunk";
import { WAITING_ROOM } from "../../../routes/routes_consts";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "@hooks/useAuthRedirect";
import GameTypeSelector from "../../components/GameTypeSelector";


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
  useAuthRedirect();

  const [level, setLevel] = useState(null);
  const [status, setStatus] = useState(null);
  const [gameType, setGameType] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCreateRoom = () => {
    if (!level || !status|| !gameType) {
      alert("Please select both level , status and game type");
      return;
    }

    //TODO: Assuming user already exists here, because it passed check in './ServersRoom/Footer.handleCreateRoomClick'.
    // console.log(level, status);

    const key = crypto.randomUUID();
    dispatch(
      createRoom({ key, users: TEMP_USER, level, status, admin: TEMP_USER })
    );

    navigate(WAITING_ROOM(key));
  };

  return (
    <div className="bg-[url('/homePage.png')] bg-cover min-h-screen flex items-center justify-center">
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
          className="bg-green-400"
        />
      </BlueBox>
    </div>
  );
};

export default CreateRoom;
