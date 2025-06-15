import { useCallback, useEffect, useRef } from "react";
import { socket } from "../sockets/sockets";
import { useDispatch } from "react-redux";
import { setTranslationGameState } from "../store/slices/translationGameSlice";

export function useSocket() {
  const socketRef = useRef(socket);
  const dispatch = useDispatch();

  const updateTranslationGameState = useCallback(
    (room) => {
      dispatch(setTranslationGameState(room));
    },
    [dispatch]
  );

  const startListeners = useCallback(() => {
    const ref = socketRef.current;
    ref.on("set-translation-game-state", updateTranslationGameState);
  }, [updateTranslationGameState]);

  const stopListeners = useCallback(() => {
    const ref = socketRef.current;
    ref.off("set-translation-game-state", updateTranslationGameState);
  }, [updateTranslationGameState]);

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
