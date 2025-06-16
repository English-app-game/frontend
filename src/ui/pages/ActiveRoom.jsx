import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TranslationGame from "../components/TranslationGame/TranslationGame";
import MemoryGame from "../components/MemoryGame/MemoryGame";
import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";
import { ROOMS_LIST } from "../../routes/routes_consts";
import {  ROUTES } from "../../routes/routes_consts";
import { resetRoom } from "../../store/slices/roomSlice";
import removeUserFromRoom from "../../services/room/removeUserFromRoom";

export default function ActiveRoom() {
  const { id: roomKey, gameType } = useParams();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const { id: userId } = user;
  const dispatch = useDispatch();

  const handleBack = async () => {
    if (!userId || !roomKey) {
      dispatch(resetRoom());
      return navigate(ROUTES.ROOMS_LIST);
    }

    await removeUserFromRoom(roomKey, userId);

    dispatch(resetRoom());
    navigate(ROUTES.ROOMS_LIST);
  };


  //or look at it
  console.log("gameType from params:", gameType);
  const normalizedGameType = gameType.toLowerCase().replace(/[_ ]/g, "");

  if (normalizedGameType === "translation") {
    return <TranslationGame roomKey={roomKey} />;
  }
  if (normalizedGameType === "memorygame") {
    return <MemoryGame roomKey={roomKey} />;
  }

  return (
    <h1>
      Unsupported game types! Please navigate back to rooms!{" "}
      <button
        className="bg-red-500 border-2 border-amber-500"
        onClick={handleBack}
      >
        back to rooms
      </button>
    </h1>
  );
}
