import useAuthRedirect from "@hooks/useAuthRedirect";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TranslationGame from "../components/TranslationGame/TranslationGame";

export default function ActiveRoom() {
  useAuthRedirect();
  const { id: roomKey, gameType } = useParams();

  const room = useSelector((store) => store.room);
  console.log(room);

  if (gameType.toLowerCase() == "translation")
    return <TranslationGame roomKey={roomKey} />;

  // TODO: Implement other game types (tomer?)
  // if(gameType.toLowerCase() == 'memory')
  //   return <MemoryGame />

  return <h1>Unsupported game types! Please navigate back to rooms! </h1>;
}
