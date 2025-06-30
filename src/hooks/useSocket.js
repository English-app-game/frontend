import { useCallback, useEffect, useRef } from "react";
import { socket } from "../sockets/sockets";
import { useDispatch } from "react-redux";
import { setTranslationGameState } from "../store/slices/translationGameSlice";
import { toast } from "react-toastify";
import { TRANSLATION_GAME_EVENTS } from "../consts/translationGame";
import { correctMatch, gameEnded, inCorrectMatch } from "./hooksStrings";

export function useSocket() {
  const socketRef = useRef(socket);
  const dispatch = useDispatch();
  console.log('test');

  const updateTranslationGameState = useCallback(
    (room) => {
      dispatch(setTranslationGameState(room));
    },
    [dispatch]
  );

  const handleEndGameMessage = useCallback(({ message }) => {
    toast.info(message);
  }, []);

  const handleMatchFeedback = useCallback(({ correct }) => {
    toast.dismiss();
    if (correct) {
      toast.success(correctMatch);
    } else {
      toast.error(inCorrectMatch);
    }
  }, []);

  const handleEndGame = useCallback(
    ({ message, finalState }) => {
      toast.dismiss();
      toast.info(message || gameEnded);
      dispatch(setTranslationGameState({ ...finalState, end: true }));
      // Optionally: navigate to a summary page or trigger some game end UI
    },
    [dispatch]
  );

  const startListeners = useCallback(() => {
    const ref = socketRef.current;
    ref.on(TRANSLATION_GAME_EVENTS.SET_STATE, updateTranslationGameState);
    ref.on(TRANSLATION_GAME_EVENTS.MATCH_FEEDBACK, handleMatchFeedback);
    ref.on(TRANSLATION_GAME_EVENTS.END, handleEndGame);
    ref.on(TRANSLATION_GAME_EVENTS.END_GAME_MESSAGE, handleEndGameMessage);
  }, [updateTranslationGameState, handleMatchFeedback, handleEndGame, handleEndGameMessage]);

  const stopListeners = useCallback(() => {
    const ref = socketRef.current;
    ref.off(TRANSLATION_GAME_EVENTS.SET_STATE, updateTranslationGameState);
    ref.off(TRANSLATION_GAME_EVENTS.MATCH_FEEDBACK, handleMatchFeedback);
    ref.off(TRANSLATION_GAME_EVENTS.END, handleEndGame);
    ref.off(TRANSLATION_GAME_EVENTS.END_GAME_MESSAGE, handleEndGameMessage);
  }, [updateTranslationGameState, handleMatchFeedback, handleEndGame, handleEndGameMessage]);

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
