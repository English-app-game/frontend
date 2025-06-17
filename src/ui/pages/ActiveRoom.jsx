import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TranslationGame from "../components/TranslationGame/TranslationGame";
import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";
import { ROOMS_LIST, ROUTES } from "../../routes/routes_consts";
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

  useEffect(() => {
    if (!roomKey || !user.id) return;
    emit("join-room", {
      roomKey,
      user,
    });
  }, [roomKey, emit, user]);


  if (gameType.toLowerCase() == "translation")
    return <TranslationGame handleBack={handleBack} roomKey={roomKey} />;

  // TODO: Implement other game types (tomer?)
  // Remove this comment when implementing other game types
  // if(gameType.toLowerCase() == 'memorygame')
  //   return <MemoryGame />

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
