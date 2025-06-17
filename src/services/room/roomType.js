import { BASE_URL } from "../../consts/consts";

export async function getAllGameTypes() {
  const res = await fetch(`${BASE_URL}/game-types`);
  if (!res.ok) throw new Error("Failed to fetch game types");
  return await res.json();
}