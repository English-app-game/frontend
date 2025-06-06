import { BASE_URL } from "../../consts/consts";

export async function getRoom(roomKey) {
  try {
    const response = await fetch(`${BASE_URL}/rooms/${roomKey}`);
    if (!response.ok) {
      throw new Error("Room not found");
    }
    const room = await response.json();
    return room;
  } catch (error) {
    console.error("Error fetching room:", error);
  }
}
