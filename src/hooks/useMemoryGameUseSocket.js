import { useEffect, useRef, useCallback } from "react";
import { socket } from "../sockets/sockets";
import { useDispatch, useSelector } from "react-redux";
import { setMemoryGameState, resetMemoryGameState } from "../store/slices/memoryGameSlice";
import { toast } from "react-toastify";
import { MEMORY_GAME_STATE, MEMORY_GAME_END,MEMORY_GAME_PLAYER_LEFT } from "../consts/consts";

export function useMemoryGameSocket(roomKey,onGameEnd) {
  const socketRef = useRef(socket);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.memoryGame);

  // --- Handlers ---
  const updateMemoryGameState = useCallback((gameState) => {
    console.log("📩 Received game state from server:", JSON.stringify(gameState, null, 2));
    dispatch(setMemoryGameState(gameState));
  }, [dispatch]);

  const handleGameEnd = useCallback(({ winners, finalScore }) => {
  dispatch(setMemoryGameState({
    users: Object.fromEntries(winners.map(p => [p.userId || p.id, p]))
  }));

  if (onGameEnd) onGameEnd(winners);
}, [dispatch, onGameEnd]);

  // --- Event listeners setup ---
  const startListeners = useCallback(() => {
    const currSocket = socketRef.current;
    currSocket.on(MEMORY_GAME_STATE, updateMemoryGameState);
    currSocket.on(MEMORY_GAME_END, handleGameEnd);
    currSocket.on(MEMORY_GAME_PLAYER_LEFT, ({ userId, name }) => {
    toast.info(`🚪 ${name} left the game.`);
  });
  }, [updateMemoryGameState, handleGameEnd, dispatch]);

  const stopListeners = useCallback(() => {
    const currSocket = socketRef.current;
    currSocket.off(MEMORY_GAME_STATE, updateMemoryGameState);
    currSocket.off(MEMORY_GAME_END, handleGameEnd);
    currSocket.off(MEMORY_GAME_PLAYER_LEFT);
    
  }, [updateMemoryGameState, handleGameEnd]);

  // --- Emit wrapper ---
  const socketDispatcher = useCallback((event, payload, callback) => {
    socket.emit(event, payload, callback);
  }, []);

  // --- Lifecycle management ---
  useEffect(() => {
    const currSocket = socketRef.current;

    if (!user?.id || !roomKey) {
      console.log("⛔️ Missing user or roomKey, skipping socket emit");
      return;
    }

    if (!currSocket.connected) currSocket.connect();

    console.log("📤 Emitting memory-game/join", { roomKey, user });
    currSocket.emit("memory-game/join", { roomKey, user });

    return () => {
      currSocket.disconnect();
    };
  }, [roomKey, user?.id]);

  useEffect(() => {
    startListeners();
    return () => {
      stopListeners();
    };
  }, [startListeners, stopListeners]);

  // --- Custom emitters ---
  const requestFlipCard = useCallback((userId, cardId, lang, callback) => {
      console.log("📤 Emitting memory-game/flip-card", { roomKey, userId, cardId, lang });
    socketDispatcher("memory-game/flip-card", { roomKey, userId, cardId, lang }, callback);
  }, [roomKey, socketDispatcher]);

  const requestMatchCheck = useCallback((userId, firstCard, secondCard, callback) => {
    socketDispatcher(
      "memory-game/match-check",
      { roomKey, userId, firstCard, secondCard },
      callback
    );
  }, [roomKey, socketDispatcher]);

  return {
    socket: socketRef.current,
    emit: socketDispatcher,
    requestFlipCard,
    requestMatchCheck
  };
}
