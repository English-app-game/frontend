import { useNavigate } from "react-router-dom";
import JoinGameRoom from "../../components/JoinGameRoom";

export default function Main({ rooms }) {

  const navigate= useNavigate();

  const handleClick=(roomId, currentPlayers, capacity)=>{
    if (currentPlayers< capacity)
      navigate(`/WaitingRoom/${roomId}`);
    else
      console.log('This room is full');
  };

  return (
    <main className="flex-1 overflow-y-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center pb-36 sm:pb-36">
      {rooms.map((_, index) => (  // change from index to room id ?????
        <JoinGameRoom
          id={index}
          currentPlayers={2}
          capacity={5}
          key={index}
          onClick={() => handleClick(index, currentPlayers, capacity)}
          className="w-32 sm:w-52"
        />
      ))}
    </main>
  );
}
