import React, { useState } from "react";
import LevelSelector from "./LevelSelector";
import StatusSelector from "./StatusSelector";
import PrimaryButton from "../../../ui/components/PrimaryButton";
import BlueBox from "../../../ui/components/BlueBox";
import Header from "../../components/Header";
import useAuthRedirect from "@hooks/useAuthRedirect";

import { useDispatch } from "react-redux";
import { createRoom } from "../../../store/thunks/createRoomThunk";
import { WAITING_ROOM } from "../../../routes/routes_consts";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useAuthRedirect();
  
  const dispatch = useDispatch();

  const handleCreateRoom = () => {
    if (!level || !status) {
      alert("Please select both level and status");
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
      <BlueBox size="large" className="text-center w-[50rem] h-[30rem]">
        <Header
          className="text-4xl font-extrabold mb-6 uppercase"
          text={`CREATE YOUR GAME ROOM`}
        ></Header>
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
