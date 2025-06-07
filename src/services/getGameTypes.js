import { BASE_URL } from "../consts/consts";
export const getGameTypes = async (thunkAPI) => {

  const gamesTypesRes =  await fetch(`${BASE_URL}/game-types`);
  if (!gamesTypesRes.ok) {
    const errorData = await gamesTypesRes.json();
    return thunkAPI.rejectWithValue(
      errorData.error || "Failed to fetch game types"
    );
  }

  const gameTypes = await gamesTypesRes.json();
  return gameTypes;
};
