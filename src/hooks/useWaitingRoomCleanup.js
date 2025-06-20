import { useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWaitingRoomSocket } from "./useWaitingRoomSocket";
import { ROUTES } from "../routes/routes_consts";
import { useDispatch } from "react-redux";
import { resetRoom } from "../store/slices/roomSlice";

// Cleanup reason constants
const CLEANUP_REASONS = {
  UNKNOWN: "unknown",
  URL_CHANGE: "URL_CHANGE",
  BROWSER_CLOSE: "BROWSER_CLOSE", 
  COMPONENT_UNMOUNT: "COMPONENT_UNMOUNT",
  EXIT_BUTTON: "EXIT_BUTTON",
};

export function useWaitingRoomCleanup(roomKey, userId, hasJoinedRoom) {
  const { leaveWaitingRoom } = useWaitingRoomSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cleanupPerformedRef = useRef(false);
  const currentRoomRef = useRef(roomKey);
  const currentUserRef = useRef(userId);

  // Update refs when props change
  useEffect(() => {
    currentRoomRef.current = roomKey;
    currentUserRef.current = userId;
  }, [roomKey, userId]);

  const performCleanup = useCallback(async (reason = CLEANUP_REASONS.UNKNOWN) => {
    const currentRoomKey = currentRoomRef.current;
    const currentUserId = currentUserRef.current;

    if (cleanupPerformedRef.current || !currentRoomKey || !currentUserId || !hasJoinedRoom) {
      return;
    }

    cleanupPerformedRef.current = true;

    try {
      await leaveWaitingRoom(currentRoomKey, currentUserId);
      dispatch(resetRoom());
    } catch (error) {
      console.error("Error during waiting room cleanup:", error);
    }
  }, [leaveWaitingRoom, hasJoinedRoom, dispatch]);

  // Handle URL changes (navigation away from waiting room)
  useEffect(() => {
    const currentPath = location.pathname;
    const isLeavingWaitingRoom = hasJoinedRoom && roomKey && !currentPath.includes(`/rooms/${roomKey}`);
    
    if (isLeavingWaitingRoom) {
      performCleanup(CLEANUP_REASONS.URL_CHANGE);
    }
  }, [location.pathname, roomKey, hasJoinedRoom, performCleanup]);

  // Handle browser close/refresh/tab close
  useEffect(() => {
    if (!hasJoinedRoom || !roomKey || !userId) return;

    const handleBeforeUnload = async (event) => {
      // For modern browsers, we can't make async calls in beforeunload
      // But we can use navigator.sendBeacon for a fire-and-forget request
      if (navigator.sendBeacon && window.location.origin) {
        const data = JSON.stringify({ roomKey, userId });
        navigator.sendBeacon(`${window.location.origin}/api/rooms/quick-leave`, data);
      }
      
      // Also perform the regular cleanup (though it might not complete)
      performCleanup(CLEANUP_REASONS.BROWSER_CLOSE);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [roomKey, userId, hasJoinedRoom, performCleanup]);

  // Component unmount cleanup (covers most other cases)
  useEffect(() => {
    return () => {
      if (hasJoinedRoom && currentRoomRef.current && currentUserRef.current) {
        performCleanup(CLEANUP_REASONS.COMPONENT_UNMOUNT);
      }
    };
  }, [hasJoinedRoom, performCleanup]);

  // Manual exit function for exit button
  const exitRoom = useCallback(async () => {
    await performCleanup(CLEANUP_REASONS.EXIT_BUTTON);
    navigate(ROUTES.ROOMS_LIST);
  }, [performCleanup, navigate]);

  return { exitRoom, performCleanup };
} 