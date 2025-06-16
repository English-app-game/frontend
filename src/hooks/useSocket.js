import { useCallback, useEffect, useRef } from "react";
import { socket } from "../sockets/sockets";
import { useDispatch } from "react-redux";
import { setTranslationGameState } from "../store/slices/translationGameSlice";
import { toast } from "react-toastify";
import { TRANSLATION_GAME_EVENTS } from "../consts/translationGame";

export function useSocket() {
  const socketRef = useRef(socket);
  const dispatch = useDispatch();

  const updateTranslationGameState = useCallback(
    (room) => {
      console.log(room);
      dispatch(setTranslationGameState(room));
    },
    [dispatch]
  );

  const handleMatchFeedback = useCallback(({ correct }) => {
    if (correct) {
      toast.success("✅ Correct match!");
    } else {
      toast.error("❌ Incorrect match!");
    }
  }, []);

  const startListeners = useCallback(() => {
    const ref = socketRef.current;
    ref.on(TRANSLATION_GAME_EVENTS.SET_STATE, updateTranslationGameState);
    ref.on(TRANSLATION_GAME_EVENTS.MATCH_FEEDBACK, handleMatchFeedback);
  }, [updateTranslationGameState, handleMatchFeedback]);

  const stopListeners = useCallback(() => {
    const ref = socketRef.current;
    ref.off(TRANSLATION_GAME_EVENTS.SET_STATE, updateTranslationGameState);
    ref.off(TRANSLATION_GAME_EVENTS.MATCH_FEEDBACK, handleMatchFeedback);
  }, [updateTranslationGameState, handleMatchFeedback]);

  const socketDispatcher = useCallback((event, payload, callback) => {
    socket.emit(event, payload, callback);
  }, []);

  useEffect(() => {
    const ref = socketRef.current;
    if (!ref.connected) ref.connect();

    return () => {
      ref.disconnect();
    };
  }, []);

  useEffect(() => {
    startListeners();
    return () => {
      stopListeners();
    };
  }, [startListeners, stopListeners]);

  return { socket: socketRef.current, emit: socketDispatcher };
}
