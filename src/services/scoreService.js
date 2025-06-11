import { PLAYER_SCORE } from "../consts/consts";

export async function fetchLastScore(playerId) {
  const response = await fetch(`${PLAYER_SCORE}/${playerId}`);
  if (!response.ok) throw new Error("Score not found");

  return response.json();
}