import { BASE_URL } from "../../consts/consts";

export async function getRoomLevel(roomKey) {
  const res = await fetch(`${BASE_URL}/rooms/${roomKey}`);

  if (!res.ok) {
    throw new Error("❌ Failed to fetch room level");
  }

  const data = await res.json();
  return data.level
}
