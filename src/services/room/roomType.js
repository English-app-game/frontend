export const BASE_GAMES_URL = "http://localhost:5000/api";


export async function getAllGameTypes() {
  const res = await fetch(`${BASE_GAMES_URL}/game-types`);
  if (!res.ok) throw new Error("Failed to fetch game types");
  return await res.json();
}