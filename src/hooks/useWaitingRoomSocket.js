import { useCallback, useEffect, useRef } from "react";
import { socket } from "../sockets/sockets";

export function useWaitingRoomSocket() {
  const socketRef = useRef(socket);

  const socketDispatcher = useCallback((event, payload, callback) => {
    const ref = socketRef.current;
    if (ref.connected) {
      ref.emit(event, payload, callback);
    } else {
      ref.connect();
      ref.once('connect', () => {
        ref.emit(event, payload, callback);
      });
    }
  }, []);

  const addListener = useCallback((event, handler) => {
    const ref = socketRef.current;
    ref.on(event, handler);
    
    return () => {
      ref.off(event, handler);
    };
  }, []);

  const removeListener = useCallback((event, handler) => {
    const ref = socketRef.current;
    ref.off(event, handler);
  }, []);

  useEffect(() => {
    const ref = socketRef.current;
    
    if (!ref.connected) {
      ref.connect();
    }

    return () => {
      ref.disconnect();
    };
  }, []);

  const connect = useCallback(() => {
    const ref = socketRef.current;
    if (!ref.connected) {
      ref.connect();
    }
  }, []);

  const disconnect = useCallback(() => {
    const ref = socketRef.current;
    if (ref.connected) {
      ref.disconnect();
    }
  }, []);

  return { 
    socket: socketRef.current, 
    emit: socketDispatcher,
    addListener,
    removeListener,
    connect,
    disconnect
  };
} 