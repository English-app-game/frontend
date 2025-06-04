import { GameTypes } from "../../consts/gameTypes";
import { formatDateAndTime } from "../../services/dateService";
import { BASE_URL } from "../../consts/consts";
export async function addRoomToDB(roomData, thunkAPI) {
  try {
    const gamesTypesRes = await fetch(`${BASE_URL}/game-types`);

    if (!gamesTypesRes.ok) {
      const errorData = await gamesTypesRes.json();
      return thunkAPI.rejectWithValue(
        errorData.error || "Failed to fetch game types"
      );
    }

    const gameTypes = await gamesTypesRes.json();

    const wordMatchGameType = gameTypes.find(
      (type) => type.name === "word match"
    );
    if (!wordMatchGameType._id) {
      return thunkAPI.rejectWithValue("Word match game type not found");
    }
    roomData.gameType = wordMatchGameType._id;
    roomData.maxPlayers = wordMatchGameType.maxNumOfPlayers;

    const roomTemplate = {
      players: [],
      isActive: true,
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
