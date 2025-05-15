import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes_consts";
import LevelSelector from "./LevelSelector";
import StatusSelector from "./StatusSelector";
import PrimaryButton from "../../../ui/components/PrimaryButton";
import BlueBox from "../../../ui/components/BlueBox";
import Header from "../../components/Header";
import useAuthRedirect from "@hooks/useAuthRedirect";


const CreateRoom = () => {
  const [level, setLevel] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useAuthRedirect();
  
  const handleCreateRoom = () => {
    if (!level || !status) {
      alert("Please select both level and status");
      return;
    }
    navigate(ROUTES.WAITING_ROOM(), { state: { level, status } });
  };

  
  return (
    <div className="bg-[url('/homePage.png')] bg-cover min-h-screen flex items-center justify-center">
      <BlueBox size="large" className="text-center w-[50rem] h-[30rem]">
        <Header className="text-4xl font-extrabold mb-6 uppercase" text={`CREATE YOUR GAME ROOM`}></Header>
        <LevelSelector level={level} setLevel={setLevel} />
        <StatusSelector status={status} setStatus={setStatus} />
        <PrimaryButton text="LET'S GO" onClick={handleCreateRoom} className="bg-green-400" />
      </BlueBox>
    </div>
  );
};

export default CreateRoom;
