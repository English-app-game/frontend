import JoinGameRoom from "../../components/JoinGameRoom";

export default function Main({ rooms }) {
  return (
    <main className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
      {rooms.map((_, index) => (
        <JoinGameRoom
          id={index}
          currentPlayers={2}
          capacity={5}
          key={index}
          className="w-32 sm:w-52"
        />
      ))}
    </main>
  );
}
