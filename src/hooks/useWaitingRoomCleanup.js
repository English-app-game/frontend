import { useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWaitingRoomSocket } from "./useWaitingRoomSocket";
import { ROOMS_LIST, ROUTES } from "../routes/routes_consts";
import { useDispatch } from "react-redux";
import { resetRoom } from "../store/slices/roomSlice";
import { enteredToGameFrom } from "../consts/strings";
import {
  beforeunload,
  BROWSER_CLOSE,
  COMPONENT_UNMOUNT,
  errorDuringWaitingRoomCleanup,
  EXIT_BUTTON,
  unknown,
  URL_CHANGE,
} from "./hooksStrings";

// Cleanup reason constants
const CLEANUP_REASONS = {
  UNKNOWN: unknown,
  URL_CHANGE: URL_CHANGE,
  BROWSER_CLOSE: BROWSER_CLOSE,
  COMPONENT_UNMOUNT: COMPONENT_UNMOUNT,
  EXIT_BUTTON: EXIT_BUTTON,
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

  const performCleanup = useCallback(
    async (reason = CLEANUP_REASONS.UNKNOWN) => {
      const currentRoomKey = currentRoomRef.current;
      const currentUserId = currentUserRef.current;

      if (
        cleanupPerformedRef.current ||
        !currentRoomKey ||
        !currentUserId ||
        !hasJoinedRoom
      ) {
        return;
      }

      cleanupPerformedRef.current = true;

      try {
        // Only send LEAVE event for intentional exits, not page refreshes
        if (
          reason === CLEANUP_REASONS.EXIT_BUTTON ||
          reason === CLEANUP_REASONS.URL_CHANGE
        ) {
          await leaveWaitingRoom(currentRoomKey, currentUserId);
        } else {
          // Don't send LEAVE event - let the socket disconnection handle it naturally
          // The backend will treat this as a temporary disconnection
        }
        setTimeout(() => {
          dispatch(resetRoom());
        }, 2000);
      } catch (error) {
        console.error(errorDuringWaitingRoomCleanup, error);
      }
    },
    [leaveWaitingRoom, hasJoinedRoom, dispatch]
  );

  useEffect(() => {
    const currentPath = location.pathname;
    const isLeavingWaitingRoom =
      hasJoinedRoom &&
      roomKey &&
      !currentPath.includes(`${ROOMS_LIST}/${roomKey}`);

    if (isLeavingWaitingRoom) {
      performCleanup(CLEANUP_REASONS.URL_CHANGE);
    }
  }, [location.pathname, roomKey, hasJoinedRoom, performCleanup]);

  useEffect(() => {
    if (!hasJoinedRoom || !roomKey || !userId) return;

    const handleBeforeUnload = async (event) => {
      setTimeout(() => {
        dispatch(resetRoom());
      }, 2000);
    };

    window.addEventListener(beforeunload, handleBeforeUnload);

    return () => {
      window.removeEventListener(beforeunload, handleBeforeUnload);
    };
  }, [roomKey, userId, hasJoinedRoom, dispatch]);

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
    localStorage.removeItem(enteredToGameFrom);
    navigate(ROUTES.ROOMS_LIST);
  }, [performCleanup, navigate]);

  return { exitRoom, performCleanup };
}
