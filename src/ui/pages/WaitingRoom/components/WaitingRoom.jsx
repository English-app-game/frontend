import RoomHeader from "./RoomHeader";
import PlayersList from "./PlayerList";
import RoomFooter from "./RoomFooter";
import { fetchPlayers } from "../../../../services/room/getPlayers";
import { joinUserToRoom } from "../../../../services/room/joinUserToRoom";
import { getStoredUser } from "../../../../hooks/useAuthRedirect";
import { useWaitingRoomSocket } from "../../../../hooks/useWaitingRoomSocket";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../../../store/slices/roomSlice";
import startGameService from "../../../../services/startGame";
import { RoomStatus } from "../../../../consts/gameTypes";
import { ROUTES } from "../../../../routes/routes_consts";
import { getAllGameTypes } from "../../../../services/room/roomType";
import { WAITING_ROOM_EVENTS } from "../../../../consts/socketEvents";
import { toast } from 'react-toastify';

export default function WaitingRoom() {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const room = useSelector((store) => store.room);
  const userId = useSelector((store) => store.user.id);
  const { id: roomKey } = useParams();
  const [players, setPlayers] = useState([]);
  const [hostId, setHostId] = useState(null);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { socket, emit } = useWaitingRoomSocket();
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(roomKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleStart = async () => {
    // comment this check if this blocks starting the game
    if (players.length < 2) {
      toast.error("At least 2 players are required to start the game.");
      return;
    }

    if (userId !== room.admin) {
      toast.error("Only the host can start the game.");
      return;
    }

    try {
      const updatedRoom = await startGameService(roomKey, userId);
      setGameStarted(true);
      dispatch(startGame(updatedRoom.currentStatus));
    } catch (error) {
      console.error(error);
      toast.error("Failed to start the game. Please try again later.");
    }
  };

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
        
        emit(WAITING_ROOM_EVENTS.JOIN, { 
          roomKey, 
          user: {
            id: user.id,
            name: user.name,
            avatarImg: user.avatarImg,
            isGuest: isGuest
          }
        });
        
        setHasJoinedRoom(true);
      } catch (error) {
        console.error("Failed to join room:", error);
      }
    };

    joinRoom();
  }, [roomKey, userId, hasJoinedRoom, emit]);

  useEffect(() => {
    if (!socket) return;

    const handlePlayersUpdate = ({ players, count }) => {
      console.log("📋 Received player list update:", players);
      const transformedPlayers = players.map(player => ({
        _id: player.id, 
        name: player.name,
        avatarImg: player.avatarImg,
        isGuest: player.isGuest || false
      }));
      setPlayers(transformedPlayers);
    };

    socket.on(WAITING_ROOM_EVENTS.PLAYERS_UPDATED, handlePlayersUpdate);

    const fetchInitialData = async () => {
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
        setPlayers(allPlayers);
        setHostId(data.admin._id);
      } catch (err) {
        console.error("Failed fetching initial players", err);
      }
    };

    fetchInitialData();

    return () => {
      socket.off(WAITING_ROOM_EVENTS.PLAYERS_UPDATED, handlePlayersUpdate);
    };
  }, [socket, roomKey]);

  useEffect(() => {
    if (!gameStarted || !room.currentStatus) return;

    const checkGameStart = async () => {
      if (room.currentStatus.toLowerCase() === RoomStatus.PLAYING) {
        try {
          const gameTypes = await getAllGameTypes();
          const match = gameTypes.find((gt) => gt._id === room.gameType);
          let gameType = match ? match.name.trim().split(" ").join("") : "Unknown";

          if (!gameType) {
            console.error("Game type not found for room:", roomKey);
            navigate(ROUTES.ROOMS_LIST);
            return;
          }

          navigate(ROUTES.ACTIVE_ROOM(roomKey, gameType));
        } catch (error) {
          console.error("Error navigating to active room:", error);
        }
      }
    };

    checkGameStart();
  }, [gameStarted, room.currentStatus, room.gameType, roomKey, navigate]);

  useEffect(() => {
    return () => {
      if (hasJoinedRoom && roomKey && userId) {
        emit(WAITING_ROOM_EVENTS.LEAVE, { roomKey, userId });
      }
    };
  }, [hasJoinedRoom, roomKey, userId, emit]);

  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen bg-[url('/homePage.png')] bg-cover bg-center px-4">
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
