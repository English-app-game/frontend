import { BASE_URL, GAMETYPE_ROUTE } from "../../consts/consts";

export async function getAllGameTypes() {
  const res = await fetch(`${BASE_URL}${GAMETYPE_ROUTE}`);
  if (!res.ok) throw new Error("Failed to fetch game types");
  return await res.json();
}