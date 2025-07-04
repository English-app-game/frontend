import JoinGameRoom from "../../components/JoinGameRoom";
import NoRoomsMessage from "../ServersRoom/NoRoomsMessage";
import RoomCardSkeleton from "../../components/RoomCardSkeleton"


export default function Main({ rooms, isLoading }) {

  if (isLoading){
    return (
       <main className="flex-1 overflow-y-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center pb-36 sm:pb-36">
        {[...Array(6)].map((_, idx) => (
          <RoomCardSkeleton key={idx} />
        ))}
      </main>
    )};

 if (rooms.length === 0) {
    return <NoRoomsMessage />;
  }
  
  return (
    <main className="flex-1 overflow-y-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center pb-36 sm:pb-36">
      {rooms.map((room, index) => (
        <JoinGameRoom
          id={room.key}
          currentPlayers={room.amountOfPlayers}
          displayIndex={index} 
          capacity={room.maxPlayers}
          key={room.key}
          className="w-32 sm:w-52"
          gameType={room.gameType}
        />
      ))}
    </main>
  );
}
