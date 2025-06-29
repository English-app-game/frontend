import RoomHeader from "./RoomHeader";
import PlayersList from "./PlayerList";
import RoomFooter from "./RoomFooter";
import { fetchPlayers } from "../../../../services/room/getPlayers";
import { joinUserToRoom } from "../../../../services/room/joinUserToRoom";
import { getStoredUser } from "../../../../hooks/useAuthRedirect";
import { useWaitingRoomSocket } from "../../../../hooks/useWaitingRoomSocket";
import { useWaitingRoomCleanup } from "../../../../hooks/useWaitingRoomCleanup";
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
import useRoomPolling from "../../../../hooks/useRoomPolling";
import { FaClock } from "react-icons/fa";
import { setUser } from "../../../../store/slices/userSlice";


export default function WaitingRoom() {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const room = useSelector((store) => store.room);
  const reduxUserId = useSelector((store) => store.user.id);
  // Fallback to stored user if Redux store isn't populated yet (race condition with useAuthRedirect)
  const storedUser = getStoredUser();
  const userId = reduxUserId || storedUser?.id;
  const { id: roomKey } = useParams();
  const [players, setPlayers] = useState([]);
  const [hostId, setHostId] = useState(null);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [hasEmittedJoin, setHasEmittedJoin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { socket, emit, connectWithTimeout } = useWaitingRoomSocket();
  const navigate = useNavigate();
  const [showHostLeftModal, setShowHostLeftModal] = useState(false);

  const { exitRoom } = useWaitingRoomCleanup(roomKey, userId, hasJoinedRoom);

  useRoomPolling(roomKey);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleStart = async () => {
    // comment this check if this blocks starting the game
   
      
    const gameTypes = await getAllGameTypes();
    const match = gameTypes.find((gt) => gt._id === room.gameType);
    let gameType = match ? match.name.trim().split(" ").join("") : "Unknown";

    // if (players.length < 2 && gameType !== "guesstheword") {
    //   toast.error("At least 2 players are required to start the game.");
    //   return;
    // }

    // if (userId !== room.admin) {
    //   toast.error("Only the host can start the game.");
    //   return;
    // }

    try {
      const updatedRoom = await startGameService(roomKey, userId);
      dispatch(setUser(storedUser));
      setGameStarted(true);
      dispatch(startGame(updatedRoom.currentStatus));
    } catch (error) {
      console.error(error);
      toast.error("Failed to start the game. Please try again later.");
    }
  };

  useEffect(() => {
    if (!roomKey || !userId || !socket || hasJoinedRoom) return;

    const user = getStoredUser();
    if (!user) return;

    const joinRoomAndEmitJoin = async () => {
      try {
        const isGuest =
          user.isGuest ||
          (typeof user.id === "string" && user.id.length !== 24);

        const handleJoinError = () => {
          navigate(ROUTES.ROOMS_LIST);
        };

        if (isGuest) {
          await joinUserToRoom(
            roomKey,
            user.id,
            {
              id: user.id,
              name: user.name,
              avatarImg: user.avatarImg,
            },
            handleJoinError
          );
        } else {
          await joinUserToRoom(roomKey, user.id, null, handleJoinError);
        }

        await connectWithTimeout(3000);

        emit(WAITING_ROOM_EVENTS.JOIN, {
          roomKey,
          user: {
            id: user.id,
            name: user.name,
            avatarImg: user.avatarImg,
            isGuest: isGuest,
          },
        });

        localStorage.setItem("enteredFromWaitingRoom", "true");
        localStorage.setItem("lastEnteredRoom", roomKey);

        setHasJoinedRoom(true);
        setHasEmittedJoin(true);
      } catch (error) {
        console.error("Failed to join room:", error);
        setTimeout(() => {
          if (!hasJoinedRoom) {
            joinRoomAndEmitJoin();
          }
        }, 1000);
      }
    };

    joinRoomAndEmitJoin();
  }, [roomKey, userId, socket, hasJoinedRoom, emit, connectWithTimeout]);

  useEffect(() => {
    if (!socket || !roomKey) return;

    let socketDataReceived = false;

    const handlePlayersUpdate = ({ players, hostId: socketHostId }) => {
      socketDataReceived = true;

      const transformedPlayers = players.map((player) => ({
        _id: player.id,
        name: player.name,
        avatarImg: player.avatarImg,
        isGuest: player.isGuest || false,
        isConnected: player.isConnected !== false,
      }));

      // Remove duplicates based on _id and ensure no null/undefined ids
      const uniquePlayers = transformedPlayers
        .filter((player) => player._id) // Remove players without valid _id
        .filter(
          (player, index, self) =>
            index === self.findIndex((p) => p._id === player._id)
        );

      setPlayers(uniquePlayers);

      if (socketHostId) {
        setHostId(socketHostId);
      }
    };

    // Set up socket listener immediately
    socket.on(WAITING_ROOM_EVENTS.PLAYERS_UPDATED, handlePlayersUpdate);

    const fetchInitialData = async () => {
      try {
        const data = await fetchPlayers(roomKey);

        // Only use DB data if no socket update has arrived yet
        if (!socketDataReceived) {
          const registeredPlayers = data.players || [];
          const guestPlayers = (data.guestPlayers || []).map((guest) => ({
            _id: guest.id,
            name: guest.name,
            avatarImg: guest.avatarImg,
            isGuest: true,
          }));
          const allPlayers = [...registeredPlayers, ...guestPlayers];

          // Remove duplicates based on _id and ensure no null/undefined ids
          const uniquePlayers = allPlayers
            .filter((player) => player._id) // Remove players without valid _id
            .filter(
              (player, index, self) =>
                index === self.findIndex((p) => p._id === player._id)
            );

          setPlayers(uniquePlayers);
          setHostId(data.admin._id);
        }
      } catch (err) {
        console.error("Failed fetching initial players", err);
      }
    };

    // Wait a bit for socket updates, then fallback to DB if needed
    const timer = setTimeout(fetchInitialData, 500);

    return () => {
      clearTimeout(timer);
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
          let gameType = match
            ? match.name.trim().split(" ").join("")
            : "Unknown";

          if (!gameType) {
            console.error("Game type not found for room:", roomKey);
            navigate(ROUTES.ROOMS_LIST);
            return;
          }

          localStorage.setItem("enteredFromWaitingRoom", "true");
          localStorage.setItem("lastEnteredRoom", roomKey);

          navigate(ROUTES.ACTIVE_ROOM(roomKey, gameType));
        } catch (error) {
          console.error("Error navigating to active room:", error);
        }
      }
    };

    checkGameStart();
  }, [gameStarted, room.currentStatus, room.gameType, roomKey, navigate]);

  useEffect(() => {
    if (!socket) return;

    const onHostLeft = () => {
      if (userId === room.admin) return;

      setShowHostLeftModal(true);
      setTimeout(() => {
        navigate(ROUTES.ROOMS_LIST);
      }, 3000);
    };

    const onRoomClosed = () => {
      setShowHostLeftModal(true);
      setTimeout(() => {
        navigate(ROUTES.ROOMS_LIST);
      }, 3000);
    };

    socket.on(WAITING_ROOM_EVENTS.HOST_LEFT, onHostLeft);
    socket.on(WAITING_ROOM_EVENTS.ROOM_CLOSED, onRoomClosed);

    return () => {
      socket.off(WAITING_ROOM_EVENTS.HOST_LEFT, onHostLeft);
      socket.off(WAITING_ROOM_EVENTS.ROOM_CLOSED, onRoomClosed);
    };
  }, [socket, navigate]);

  return (
    <div className="flex flex-col justify-evenly min-h-screen bg-[url('/homePage.png')] bg-cover bg-center pt-10 md:pt-15">
      {showHostLeftModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="bg-[#137f95] p-6 rounded-lg shadow-lg border-2 border-black text-center text-white max-w-xs sm:max-w-md w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              The host has left the room
            </h2>
            <p className="text-sm">
              You will be redirect to the rooms page in a few seconds...
            </p>
          </div>
        </div>
      )}
      <RoomHeader
        HeaderIcon={FaClock}
        HeaderText={"WAITING ROOM"}
        exitRoom={exitRoom}
      />
      <div className="flex justify-center mt-10 px-4">
        <PlayersList players={players} hostId={hostId} />
      </div>
      <RoomFooter
        exitRoom={exitRoom}
        copied={copied}
        handleCopy={handleCopy}
        handleStart={handleStart}
        roomKey={roomKey}
      />
    </div>
  );
}
