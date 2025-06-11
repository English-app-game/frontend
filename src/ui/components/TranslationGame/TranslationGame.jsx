import {  useSelector } from "react-redux";

export default function TranslationGame({roomKey, handleBack}) {

  const room = useSelector((store) => store.room);
 

  // Basic ui in next steps will be replaced with actual game interface.
  // will seperate to components in later stages.
  return (
    <div className="relative min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal-700">Translation Game</h1>
      </div>

      {/* Room Info */}
      <div className="mb-4">
        <p className="text-gray-700">
          Room ID: <span className="font-semibold">{room.key}</span>
        </p>
        <p className="text-gray-700">
          Players:{" "}
          <span className="font-semibold">{room.players?.length || 0}</span>
        </p>
      </div>

      {/* Game Area Placeholder */}
      <div className="mt-8 border-2 border-dashed border-gray-300 p-10 rounded text-center text-gray-500">
        Game interface will go here.
      </div>

      {/* Back Button - Bottom Left */}
      <button
        onClick={handleBack}
        className="absolute bottom-6 left-6 px-4 py-2 bg-rose-400 text-white rounded hover:bg-rose-500 transition"
      >
        Back to Rooms
      </button>
    </div>
  );
}
