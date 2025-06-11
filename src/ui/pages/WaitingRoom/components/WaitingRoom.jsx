import RoomHeader from "./RoomHeader";
import PlayersList from "./PlayerList";
import RoomFooter from "./RoomFooter";
import { fetchPlayers } from "../../../../services/room/getPlayers";
import { joinUserToRoom } from "../../../../services/room/joinUserToRoom";
import { getStoredUser } from "../../../../hooks/useAuthRedirect";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../../../store/slices/roomSlice";
import startGameService from "../../../../services/startGame";
import useRoomPolling from "../../../../hooks/useRoomPolling";

export default function WaitingRoom() {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const room = useSelector((store) => store.room);
  const userId = useSelector((store) => store.user.id);
  const { id: roomKey } = useParams();
  const [players, setPlayers] = useState([]);
  const [hostId, setHostId] = useState(null);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  useRoomPolling(roomKey);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleStart = async () => {
    // comment this check if this blocks starting the game
    if (players.length < 2) {
      alert("At least 2 players are required to start the game.");
      return;
    }

    if (userId !== room.admin) {
      alert("Only the host can start the game.");
      return;
    }

    try {
      const updatedRoom = await startGameService(roomKey, userId);
      // assuming gametype translation..
      dispatch(startGame(updatedRoom.currentStatus));
    } catch (error) {
      console.error(error);
      alert("Failed to start the game. Please try again later.");
    }
  };

  // Effect to join user to room when they enter the waiting room
  useEffect(() => {
    if (!roomKey || !userId || hasJoinedRoom) return;

    const joinRoom = async () => {
      try {
        const user = getStoredUser();
        
        if (!user) return;

        const isGuest = user.isGuest || typeof user.id === 'string' && user.id.length !== 24;
        
        if (isGuest) {
          const guestData = {
            id: user.id,
            name: user.name,
            avatarImg: user.avatarImg
          };
          await joinUserToRoom(roomKey, user.id, guestData);
        } else {
          await joinUserToRoom(roomKey, user.id);
        }
        
        setHasJoinedRoom(true);
      } catch (error) {
        console.error("Failed to join room:", error);
      }
    };

    joinRoom();
  }, [roomKey, userId, hasJoinedRoom]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchPlayers(roomKey);
        
        const registeredPlayers = data.players || [];
        const guestPlayers = data.guestPlayers || [];
        
        const transformedGuestPlayers = guestPlayers.map(guest => ({
          _id: guest.id, 
          name: guest.name,
          avatarImg: guest.avatarImg,
          isGuest: true 
        }));
        
        const allPlayers = [...registeredPlayers, ...transformedGuestPlayers];
        
        if (allPlayers.length !== players.length) {
          setPlayers(allPlayers);
          setHostId(data.admin._id);
        }
      } catch (err) {
        console.error("Failed fetching players", err);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/homePage.png')] bg-cover bg-center">
      <RoomHeader />
      <PlayersList players={players} hostId={hostId} />
      <RoomFooter
        copied={copied}
        handleCopy={handleCopy}
        handleStart={handleStart}
        roomKey={roomKey}
      />
    </div>
  );
}
