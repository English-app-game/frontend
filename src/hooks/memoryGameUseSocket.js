
import { useEffect, useRef, useCallback } from "react";
import { socket } from "../sockets/sockets";
import { useDispatch } from "react-redux";
import { setMemoryGameState, resetMemoryGameState } from "../store/slices/memoryGameSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


export default function useMemoryGameSocket(roomKey) {
  const dispatch = useDispatch();
  const socketRef = useRef(socket);

  const game = useSelector((state) => state.memoryGame);
  console.log("📦 Memory game state from Redux:", game);

  const user = useSelector((state) => state.user);
  console.log("🧠 game from redux:", game);


  // state update from server
  const handleStateUpdate = useCallback((game) => {
   console.log("📩 Received game state from server:", JSON.stringify(game, null, 2));
    dispatch(setMemoryGameState(game));
  }, [dispatch]);


  const handleGameEnd = useCallback(({ winners, finalScore }) => {
    toast.info("🎉 המשחק נגמר!");
    console.log("🏁 Winners:", winners);
    dispatch(resetMemoryGameState());
  }, [dispatch]);

  useEffect(() => {
  const s = socketRef.current;

   if (!user?.id || !roomKey|| user.id === "") {
    console.log("⛔️ Missing user or roomKey, skipping socket emit");
    return;
  }

  console.log("📤 Emitting memory-game/join", { roomKey, user });
  s.emit("memory-game/join", { roomKey, user });
  s.on("memory-game/state", handleStateUpdate);
  s.on("memory-game/end", handleGameEnd);

  return () => {
    s.off("memory-game/state", handleStateUpdate);
    s.off("memory-game/end", handleGameEnd);
  };
}, [handleStateUpdate, handleGameEnd, roomKey,  user?.id]);

  //request to flip-card
  const requestFlipCard = (userId, cardId, callback) => {
    socket.emit("memory-game/flip-card", { roomKey, userId, cardId }, callback);
  };

  // checking in server side if there is a match
  const requestMatchCheck = (userId, firstCardId, secondCardId, callback) => {
    socket.emit("memory-game/match-check", {
      roomKey,
      userId,
      firstCardId,
      secondCardId
    }, callback);
  };

  return {
    socket: socketRef.current,
    requestFlipCard,
    requestMatchCheck
  };
}
