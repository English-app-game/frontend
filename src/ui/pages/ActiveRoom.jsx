import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TranslationGame from "../components/TranslationGame/TranslationGame";
import MemoryGame from "../components/MemoryGame/MemoryGame";
import GuessWordGame from "../components/GuessWordGame/GuessWordGame";
import { GameTypes } from "../../consts/gameTypes";
import { ROUTES } from "../../routes/routes_consts";
import { resetRoom, setRoom } from "../../store/slices/roomSlice";
import removeUserFromRoom from "../../services/room/removeUserFromRoom";
import { enteredToGameFrom } from "../../consts/strings";
import { fetchPlayers } from "../../services/room/getPlayers";

export default function ActiveRoom() {
  const { id: roomKey, gameType } = useParams();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const { id: userId } = user;
  const dispatch = useDispatch();
  
  // Get values from Redux store as fallback
  const reduxPlayersAmount = useSelector((store) => store.room.amountOfPlayers);
  const reduxLevel = useSelector((store) => store.room.level);
  
  // Local state for current room data
  const [currentPlayersAmount, setCurrentPlayersAmount] = useState(reduxPlayersAmount);
  const [currentLevel, setCurrentLevel] = useState(reduxLevel);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current room data on mount
  useEffect(() => {
    const fetchCurrentRoomData = async () => {
      if (!roomKey) return;
      
      try {
        const roomData = await fetchPlayers(roomKey);
        
        // Update local state with current values
        const currentPlayers = roomData.players.length + (roomData.guestPlayers?.length || 0);
        setCurrentPlayersAmount(currentPlayers);
        setCurrentLevel(roomData.level);
        
        // Update Redux store with current room data
        dispatch(setRoom({
          ...roomData,
          amountOfPlayers: currentPlayers,
        }));
        
      } catch (error) {
        console.error("Failed to fetch current room data:", error);
        // Use Redux store values as fallback
        setCurrentPlayersAmount(reduxPlayersAmount || 2);
        setCurrentLevel(reduxLevel || "easy");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentRoomData();
  }, [roomKey, dispatch, reduxPlayersAmount, reduxLevel]);

  const handleBack = async () => {
    console.log("test");
    if (!userId || !roomKey) {
      dispatch(resetRoom());
      return navigate(ROUTES.ROOMS_LIST);
    }

    await removeUserFromRoom(roomKey, userId);

    localStorage.removeItem(enteredToGameFrom);
    dispatch(resetRoom());
    navigate(ROUTES.ROOMS_LIST);
  };

  // Show loading while fetching room data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading game...</p>
        </div>
      </div>
    );
  }

  console.log("the game type is" + gameType.toLowerCase());

  //or look at it
  console.log("gameType from params:", gameType);
  console.log("Current playersAmount:", currentPlayersAmount);
  console.log("Current level:", currentLevel);
  
  const normalizedGameType = gameType.toLowerCase().replace(/[_ ]/g, "");

  if (normalizedGameType === "translation") {
    return (
      <TranslationGame
        roomKey={roomKey}
        handleBack={handleBack}
        playersAmount={currentPlayersAmount}
        level={currentLevel}
      />
    );
  }
  if (normalizedGameType === "memorygame") {
    return <MemoryGame roomKey={roomKey} handleBack={handleBack} />;
  }

  if (gameType.toLowerCase() === GameTypes.TRANSLATION)
    return (
      <TranslationGame
        roomKey={roomKey}
        handleBack={handleBack}
        playersAmount={currentPlayersAmount}
        level={currentLevel}
      />
    );

  if (gameType.toLowerCase() === GameTypes.GUESS_WORD_GAME)
    return <GuessWordGame handleBack={handleBack} roomKey={roomKey} />;

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
