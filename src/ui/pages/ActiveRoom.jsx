import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TranslationGame from "../components/TranslationGame/TranslationGame";
import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";

export default function ActiveRoom() {
  const { id: roomKey, gameType } = useParams();
  const { emit } = useSocket();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!roomKey || !user.id) return;

    emit("join-room", {
      roomKey,
      user
    });
  }, [roomKey, emit, user]);

  const room = useSelector((store) => store.room);
  console.log(room);

  if (gameType.toLowerCase() == "translation")
    return <TranslationGame roomKey={roomKey} />;

  // TODO: Implement other game types (tomer?)
  // if(gameType.toLowerCase() == 'memory')
  //   return <MemoryGame />

  return <h1>Unsupported game types! Please navigate back to rooms! </h1>;
}
