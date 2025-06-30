import { useEffect } from "react";
import { saveScoreToServer } from "../services/scoreService";
import { DELETE_ROOM_ROUTE } from "../consts/consts";
import { TRANSLATION_GAME_EVENTS } from "../consts/translationGame";
import { DELETES, failedToDelRoom, itsATieGame, theWinnerIs, tiedPlayers, useHandleCleanUpFail } from "./hooksStrings";

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
          method: DELETES,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomKey: key, userId, roomAdmin: hostId }),
        });

        const result = await response.json();
        if (!response.ok)
          throw new Error(result.message || failedToDelRoom);

        const [winner] = [...scoreboard].sort((a, b) => b.score - a.score);

        const playersTiedWithWinner = scoreboard.filter(
          (player) => player.score === winner.score
        );

        if (playersTiedWithWinner.length > 1) {
          emit(TRANSLATION_GAME_EVENTS.END_GAME_MESSAGE, {
            roomKey,
            message: `${itsATieGame} ${playersTiedWithWinner
              .map((player) => player.name)
              .join(", ")
              .concat(tiedPlayers)}`,
          });
          throw new Error(`${itsATieGame}`);
        } else {
          emit(TRANSLATION_GAME_EVENTS.END_GAME_MESSAGE, {
            roomKey,
            message: `${theWinnerIs} ${winner.name}!`,
          });
        }

        Promise.all(
          [...scoreboard].map(async (player) => {
            return (
              !player.isGuest &&
              (await saveScoreToServer({
                player: player.userId,
                roomId: result.roomId,
                gameTypeId: gameType,
                score: player.score,
              }))
            );
          })
        );
      } catch (err) {
        console.error(useHandleCleanUpFail, err);
      }
    };

    cleanup();
  }, [roomKey, userId, hostId, scoreboard, gameType]);
}
