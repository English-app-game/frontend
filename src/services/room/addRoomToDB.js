import { formatDateAndTime } from "../../services/dateService";
import { BASE_URL } from "../../consts/consts";
// import { getGameTypes } from "../getGameTypes";
export async function addRoomToDB(roomData, thunkAPI) {
  try {

    const roomTemplate = {
      players: [],
      isActive: false,
      currentStatus: "waiting",
      createdAt: formatDateAndTime(new Date()),
      chat: [],
      amountOfPlayers: 1,
    };

    const response = await fetch(`${BASE_URL}/rooms/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...roomData,
        ...roomTemplate,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return thunkAPI.rejectWithValue(
        errorData.error || "Failed to create room"
      );
    }

    const newRoom = await response.json();
    return newRoom.room; // assuming backend returns { message, room }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Network error");
  }
}
