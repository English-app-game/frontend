import { useEffect } from "react";
import { saveScoreToServer } from "../services/scoreService";
import { DELETE_ROOM_ROUTE } from "../consts/consts";
import { DELETES, failedToDelRoom, useHandleCleanUpFail } from "./hooksStrings";

export function useMemoryGameCleanup({
  roomKey,
  userId,
  hostId,
  scoreboard,
  gameType,
}) {
  useEffect(() => {
    if (!roomKey || !userId || !hostId || userId !== hostId) return;
    if (!scoreboard || scoreboard.length === 0) return;

    const cleanup = async () => {
      try {
        const key = roomKey.split("/")[0];

        // מחיקת חדר מה־DB
        const response = await fetch(DELETE_ROOM_ROUTE(key), {
          method: DELETES,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomKey: key, userId, roomAdmin: hostId }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || failedToDelRoom);

        // שמירת ניקוד שחקנים
        await Promise.all(
          scoreboard.map(async (player) => {
            if (!player.isGuest) {
              return await saveScoreToServer({
                player: player.userId,
                roomId: result.roomId,
                gameTypeId: gameType,
                score: player.score,
              });
            }
          })
        );
      } catch (err) {
        console.error(useHandleCleanUpFail, err);
      }
    };

    cleanup();
  }, [roomKey, userId, hostId, scoreboard, gameType]);
}
