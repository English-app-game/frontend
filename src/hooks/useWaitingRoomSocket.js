import { useCallback, useEffect, useRef } from "react";
import { socket } from "../sockets/sockets";
import { WAITING_ROOM_EVENTS } from "../consts/socketEvents";
import removeUserFromRoom from "../services/room/removeUserFromRoom";

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

  // Enhanced cleanup function for leaving waiting room
  const leaveWaitingRoom = useCallback(async (roomKey, userId) => {
    if (!roomKey || !userId) return;

    try {      
      // Remove user from database
      await removeUserFromRoom(roomKey, userId);
      
      // Emit leave event to socket
      const ref = socketRef.current;
      if (ref.connected) {
        ref.emit(WAITING_ROOM_EVENTS.LEAVE, { roomKey, userId });
      }
    } catch (error) {
      console.error("Error leaving waiting room:", error);
    }
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
    disconnect,
    leaveWaitingRoom
  };
} 