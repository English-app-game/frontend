import { REMOVE_PLAYER_ROUTE } from "../../consts/consts";

export default async function removeUserFromRoom(roomKey, userId) {
  try {
    await fetch(REMOVE_PLAYER_ROUTE, {
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
