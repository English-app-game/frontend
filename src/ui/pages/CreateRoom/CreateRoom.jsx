import { useEffect, useRef, useState } from "react";
import LevelSelector from "./LevelSelector";
import StatusSelector from "./StatusSelector";
import PrimaryButton from "../../../ui/components/PrimaryButton";
import BlueBox from "../../../ui/components/BlueBox";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../../store/thunks/createRoomThunk";
import { LOGIN, ROOMS_LIST, WAITING_ROOM } from "../../../routes/routes_consts";
import { useNavigate } from "react-router-dom";
import GameTypeSelector from "../../components/GameTypeSelector";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SecondaryButton from "../../components/SecondaryButton";
import UserInfoHeader from "../../components/UserInfoHeader";
import { getStoredUser } from "../../../hooks/useAuthRedirect";

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
  const storedUser = getStoredUser();

  useEffect(() => {
    if(!storedUser || storedUser.isGuest)
      navigate(ROOMS_LIST);
  }, [storedUser, navigate])

  const handleCreateRoom = () => {
    if (!level || !status || !gameType) {
      toast.error("Please select game type, level and status!");
      return;
    }

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token") || null;

    if (!token) {
      toast.error("Something went wrong – try to login again.");
      console.warn("Aborting createRoom – token is missing");
      return;
    }

    dispatch(
      createRoom({
        key: null,
        users: user.id,
        level,
        status,
        gameType,
        admin: user.id,
        token,
      })
    );
  };

  useEffect(() => {
    if (!roomKey) return;

    navigate(WAITING_ROOM(roomKey));
  }, [roomKey, navigate]);

  const handleExitCreateRoom = () => {
    navigate(ROOMS_LIST);
  };

  return (
    <div className="bg-[url('/homePage.png')] bg-cover min-h-screen flex items-center justify-center px-4 py-8 sm:py-4">
      <SecondaryButton
        text={"EXIT"}
        onclick={handleExitCreateRoom}
        className={"absolute"}
      />
      <BlueBox
        size="large"
        className="text-center w-[80%] sm:w-[70%] md:w-[80%] lg:w-[50%] max-w-4xl h-auto min-h-[45rem] sm:min-h-[30rem] md:min-h-[45rem] lg:min-h-[40rem] p-6 sm:p-4 md:p-8 lg:p-8"
      >
        <Header
          className="text-2xl sm:text-2xl md:text-4xl lg:text-4xl font-extrabold mb-6 sm:mb-4 md:mb-6 uppercase"
          text={`CREATE YOUR GAME ROOM`}
        ></Header>
        <GameTypeSelector gameType={gameType} setGameType={setGameType} />
        <LevelSelector level={level} setLevel={setLevel} />
        <StatusSelector status={status} setStatus={setStatus} />
        <PrimaryButton
          text="LET'S GO"
          onClick={handleCreateRoom}
          className="bg-green-400 cursor-pointer w-full sm:w-auto px-6 py-3 sm:px-4 sm:py-2 md:px-8 md:py-4 text-base sm:text-base md:text-lg mt-4 sm:mt-4"
        />
      </BlueBox>
    </div>
  );
};

export default CreateRoom;
