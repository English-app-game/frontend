import { useCallback, useEffect, useRef } from "react";
import { socket } from "../sockets/sockets";

export function useSocket() {
  const socketRef = useRef(socket);

  const viewRoomDetailsTesting = useCallback(({ roomKey, users }) => {
    console.log(roomKey, users);
  }, []);

  const startListeners = useCallback(() => {
    const ref = socketRef.current;
    ref.on("room-details", viewRoomDetailsTesting);
  }, [viewRoomDetailsTesting]);

  const stopListeners = useCallback(() => {
    const ref = socketRef.current;
    ref.off("room-details", viewRoomDetailsTesting);
  }, [viewRoomDetailsTesting]);

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
