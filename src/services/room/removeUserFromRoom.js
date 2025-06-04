import { BASE_URL } from "../../consts/consts";

export default async function removeUserFromRoom(roomKey, userId) {
  try {
    await fetch(`${BASE_URL}/rooms/players/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomKey,
        userId,
      }),
    });
  } catch (err) {
    console.error("❌ Failed to remove player from room:", err);
  }
}
