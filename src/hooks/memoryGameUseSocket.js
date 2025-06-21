import { useEffect, useRef, useCallback } from "react";
import { socket } from "../sockets/sockets";
import { useDispatch, useSelector } from "react-redux";
import { setMemoryGameState, resetMemoryGameState } from "../store/slices/memoryGameSlice";
import { toast } from "react-toastify";
import { MEMORY_GAME_STATE, MEMORY_GAME_END } from "../consts/consts";

export function useMemoryGameSocket(roomKey) {
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
    dispatch(resetMemoryGameState());
  }, [dispatch]);

  // --- Event listeners setup ---
  const startListeners = useCallback(() => {
    const s = socketRef.current;
    s.on(MEMORY_GAME_STATE, updateMemoryGameState);
    s.on(MEMORY_GAME_END, handleGameEnd);
  }, [updateMemoryGameState, handleGameEnd, dispatch]);

  const stopListeners = useCallback(() => {
    const s = socketRef.current;
    s.off(MEMORY_GAME_STATE, updateMemoryGameState);
    s.off(MEMORY_GAME_END, handleGameEnd);
  }, [updateMemoryGameState, handleGameEnd]);

  // --- Emit wrapper ---
  const socketDispatcher = useCallback((event, payload, callback) => {
    socket.emit(event, payload, callback);
  }, []);

  // --- Lifecycle management ---
  useEffect(() => {
    const s = socketRef.current;

    if (!user?.id || !roomKey) {
      console.log("⛔️ Missing user or roomKey, skipping socket emit");
      return;
    }

    if (!s.connected) s.connect();

    console.log("📤 Emitting memory-game/join", { roomKey, user });
    s.emit("memory-game/join", { roomKey, user });

    return () => {
      s.disconnect();
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
