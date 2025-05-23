import { GameTypes } from "../../consts/gameTypes";
import { formatDateAndTime } from "../../services/dateService";

export async function addRoomToDB(roomData, thunkAPI) {
  try {
    const response = await fetch("http://localhost:5000/api/rooms/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...roomData,
        maxPlayers: 4,
        players: [],
        // i copied the id from db of translation type
        gameType: "68245ead00dfdf81fed2c805",
        isActive: true,
        currentStatus: "waiting",
        createdAt: formatDateAndTime(new Date()),
        chat: [],
        amountOfPlayers: 4,
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
