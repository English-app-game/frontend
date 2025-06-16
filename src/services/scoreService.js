import { PLAYER_SCORE, SAVE_USER_SCORE_ROUTE } from "../consts/consts";

export async function fetchLastScore(playerId) {
  const response = await fetch(`${PLAYER_SCORE}/${playerId}`);
  if (!response.ok) throw new Error("Score not found");

  return response.json();
  
}

export async function saveScoreToServer({ player, roomId, gameTypeId, score }) {
  try {
    const response = await fetch(SAVE_USER_SCORE_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player, roomId, gameTypeId, score }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to save score");
    }

    const data = await response.json();
    console.log("✅ Score saved:", data.data);
  } catch (err) {
    console.error("❌ Error saving score:", err);
  }
}
