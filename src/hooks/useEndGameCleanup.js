import { useEffect } from "react";
import { saveScoreToServer } from "../services/scoreService";
import { DELETE_ROOM_ROUTE } from "../consts/consts";

export function useEndGameCleanup({
  roomKey,
  userId,
  hostId,
  scoreboard,
  gameType,
}) {
  useEffect(() => {
    if (!roomKey || !userId || !hostId || userId !== hostId) return;

    const cleanup = async () => {
      try {
        const key = roomKey.split("/")[0];

        const response = await fetch(DELETE_ROOM_ROUTE(key), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomKey: key, userId, roomAdmin: hostId }),
        });

        const result = await response.json();
        if (!response.ok)
          throw new Error(result.message || "Failed to delete room");

        const [winner] = [...scoreboard].sort((a, b) => b.score - a.score);
        if (winner && !winner.isGuest) {
          await saveScoreToServer({
            player: winner.userId,
            roomId: result.roomId,
            gameTypeId: gameType,
            score: winner.score,
          });
        }
      } catch (err) {
        console.error("❌ useEndGameCleanup failed:", err);
      }
    };

    cleanup();
  }, [roomKey, userId, hostId, scoreboard, gameType]);
}
