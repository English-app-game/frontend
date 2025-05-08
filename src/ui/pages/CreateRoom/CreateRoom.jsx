import React, { useState } from "react";
import LevelSelector from "./LevelSelector";
import StatusSelector from "./StatusSelector";
import PrimaryButton from "../../../ui/components/PrimaryButton";
import BlueBox from "../../../ui/components/BlueBox";
import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import { createRoom } from "../../../store/slices/roomSlice";
import { WAITING_ROOM } from "../../../routes/routes_consts";
import { useNavigate } from "react-router-dom";

const TEMP_USER = {
  userId: "user123",
  name: "Alice Example",
  email: "alice@example.com",
  birthday: "1995-06-21", // ISO string or YYYY-MM-DD
  password: "securePassword123!",
  avatarImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...", // string for base64 or image URL
  lastLogin: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

const CreateRoom = () => {
  const [level, setLevel] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCreateRoom = () => {
    if (!level || !status) {
      alert("Please select both level and status");
      return;
    }

    // Assuming user already exists here, because it passed check in './ServersRoom/Footer.handleCreateRoomClick'.
    // console.log(level, status);

    const newRoomId = crypto.randomUUID();
    //  here i also need to add async middleware to handle adding the room to db but i need to wait for db implementation
    dispatch(createRoom({ newRoomId, TEMP_USER, level, status }));

    navigate(WAITING_ROOM(newRoomId));
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
