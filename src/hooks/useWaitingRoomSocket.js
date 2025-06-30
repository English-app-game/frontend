import { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "../sockets/sockets";
import { WAITING_ROOM_EVENTS, SOCKET_CONNECTION_EVENTS } from "../consts/socketEvents";
import removeUserFromRoom from "../services/room/removeUserFromRoom";
import { connected, connecting, disconnected, errorLeaveWaitnigRoom, IOClientDisconnect, socketConnectionTimeOut, waitingRoomSocketError } from "./hooksStrings";
import { errorS } from "../consts/strings";

export function useWaitingRoomSocket() {
  const socketRef = useRef(socket);
  const connectionTimeoutRef = useRef(null);
  const isConnectingRef = useRef(false);
  const [connectionState, setConnectionState] = useState(disconnected); // disconnected, connecting, connected, error

  const socketDispatcher = useCallback((event, payload, callback) => {
    const ref = socketRef.current;
    if (ref.connected) {
      ref.emit(event, payload, callback);
    } else {
      // Immediate connection attempt if not already connecting
      if (!isConnectingRef.current) {
        isConnectingRef.current = true;
        setConnectionState(connecting);
        ref.connect();
      }
      
      ref.once(SOCKET_CONNECTION_EVENTS.CONNECT, () => {
        isConnectingRef.current = false;
        setConnectionState(connected);
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
      console.error(errorLeaveWaitnigRoom, error);
    }
  }, []);

  // Enhanced connection function with timeout and retry logic
  const connectWithTimeout = useCallback((timeout = 3000) => {
    return new Promise((resolve, reject) => {
      const ref = socketRef.current;
      
      if (ref.connected) {
        setConnectionState(connected);
        resolve();
        return;
      }

      if (isConnectingRef.current) {
        // Already connecting, just wait for the connection
        ref.once(SOCKET_CONNECTION_EVENTS.CONNECT, () => {
          isConnectingRef.current = false;
          setConnectionState(connected);
          if (connectionTimeoutRef.current) {
            clearTimeout(connectionTimeoutRef.current);
            connectionTimeoutRef.current = null;
          }
          resolve();
        });
        return;
      }

      isConnectingRef.current = true;
      setConnectionState(connecting);
      
      // Set timeout
      connectionTimeoutRef.current = setTimeout(() => {
        isConnectingRef.current = false;
        setConnectionState(errorS);
        reject(new Error(socketConnectionTimeOut));
      }, timeout);

      // Setup connection handlers
      const onConnect = () => {
        isConnectingRef.current = false;
        setConnectionState(connected);
        if (connectionTimeoutRef.current) {
          clearTimeout(connectionTimeoutRef.current);
          connectionTimeoutRef.current = null;
        }
        ref.off(SOCKET_CONNECTION_EVENTS.CONNECT_ERROR, onError);
        resolve();
      };

      const onError = (error) => {
        isConnectingRef.current = false;
        setConnectionState(errorS);
        if (connectionTimeoutRef.current) {
          clearTimeout(connectionTimeoutRef.current);
          connectionTimeoutRef.current = null;
        }
        ref.off(SOCKET_CONNECTION_EVENTS.CONNECT, onConnect);
        reject(error);
      };

      ref.once(SOCKET_CONNECTION_EVENTS.CONNECT, onConnect);
      ref.once(SOCKET_CONNECTION_EVENTS.CONNECT_ERROR, onError);
      
      // Attempt connection
      ref.connect();
    });
  }, []);

  useEffect(() => {
    const ref = socketRef.current;
    
    // Connection event handlers for state management
    const handleConnect = () => {
      isConnectingRef.current = false;
      setConnectionState(connected);
    };

    const handleDisconnect = (reason) => {
      setConnectionState(disconnected);
      
      // Auto-reconnect on unexpected disconnections (not manual)
      if (reason !== IOClientDisconnect) {
        setTimeout(() => {
          if (!ref.connected && !isConnectingRef.current) {
            isConnectingRef.current = true;
            setConnectionState(connecting);
            ref.connect();
          }
        }, 500); // Quick retry
      }
    };

    const handleConnectError = (error) => {
      isConnectingRef.current = false;
      setConnectionState(errorS);
      console.error(waitingRoomSocketError, error);
    };

    const handleReconnect = (attemptNumber) => {
      setConnectionState(connecting);
    };

    const handleReconnectSuccess = () => {
      setConnectionState(connected);
    };

    // Eagerly connect the socket as soon as the hook mounts
    if (!ref.connected && !isConnectingRef.current) {
      isConnectingRef.current = true;
      setConnectionState(connecting);
      ref.connect();
    }

    // Add event listeners
    ref.on(SOCKET_CONNECTION_EVENTS.CONNECT, handleConnect);
    ref.on(SOCKET_CONNECTION_EVENTS.DISCONNECT, handleDisconnect);
    ref.on(SOCKET_CONNECTION_EVENTS.CONNECT_ERROR, handleConnectError);
    ref.on(SOCKET_CONNECTION_EVENTS.RECONNECT, handleReconnectSuccess);
    ref.on(SOCKET_CONNECTION_EVENTS.RECONNECT_ATTEMPT, handleReconnect);

    return () => {
      // Clean up
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      isConnectingRef.current = false;
      
      // Remove event listeners
      ref.off(SOCKET_CONNECTION_EVENTS.CONNECT, handleConnect);
      ref.off(SOCKET_CONNECTION_EVENTS.DISCONNECT, handleDisconnect);
      ref.off(SOCKET_CONNECTION_EVENTS.CONNECT_ERROR, handleConnectError);
      ref.off(SOCKET_CONNECTION_EVENTS.RECONNECT, handleReconnectSuccess);
      ref.off(SOCKET_CONNECTION_EVENTS.RECONNECT_ATTEMPT, handleReconnect);
      
      ref.disconnect();
    };
  }, []);

  const connect = useCallback(() => {
    const ref = socketRef.current;
    if (!ref.connected && !isConnectingRef.current) {
      return connectWithTimeout();
    }
    return Promise.resolve();
  }, [connectWithTimeout]);

  const disconnect = useCallback(() => {
    const ref = socketRef.current;
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = null;
    }
    isConnectingRef.current = false;
    setConnectionState(disconnected);
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
    connectWithTimeout,
    leaveWaitingRoom,
    connectionState, 
    isConnected: connectionState === connected,
    isConnecting: connectionState === connecting,
  };
} 