import { useEffect } from "react";
import { saveScoreToServer } from "../services/scoreService";
import { DELETE_ROOM_ROUTE } from "../consts/consts";
import { toast } from "react-toastify";
import { TRANSLATION_GAME_EVENTS } from "../consts/translationGame";

export function useEndGameCleanup({
  roomKey,
  userId,
  hostId,
  scoreboard,
  gameType,
  emit,
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

        const playersTiedWithWinner = scoreboard.filter(
          (player) => player.score === winner.score
        );

        if (playersTiedWithWinner.length > 1) {
          emit(TRANSLATION_GAME_EVENTS.END_GAME_MESSAGE, {
            roomKey,
            message: `It's a tie game! ${playersTiedWithWinner
              .map((player) => player.name)
              .join(", ").concat(" are tied for the win!")}`,
          });
          throw new Error(`It's a tie game!`);
        } else {
          emit(TRANSLATION_GAME_EVENTS.END_GAME_MESSAGE, {
            roomKey,
            message: `The winner is ${winner.name}!`,
          });
        }

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
