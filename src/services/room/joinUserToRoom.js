import { JOIN_USER_ROOM_ROUTE } from "../../consts/consts";

export async function joinUserToRoom(roomKey, userId) {
  try {
    const res = await fetch(JOIN_USER_ROOM_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomKey,
        userId
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to join the room");
    }

    const data = await res.json();
    console.log("Joined room successfully:", data);
  } catch (err) {
    console.error("❌ Error joining room:", err);
    alert("Failed to join the room.");
    return;
  }
}
