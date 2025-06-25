// services/rooms.js or similar
import { BASE_URL } from "../../consts/consts";

export async function addRoomToDB(roomData, token, thunkAPI) {
  try {
    const response = await fetch(`${BASE_URL}/rooms/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        admin: roomData.admin,
        gameType: roomData.gameType,
        level: roomData.level,
        status: roomData.status, // "private" or "public"
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return thunkAPI.rejectWithValue(
        errorData.error || "Failed to create room"
      );
    }

    const newRoom = await response.json();
    return newRoom.room;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Network error");
  }
}
