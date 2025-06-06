import { GET_PLAYERS_ROUTE } from "../../consts/consts";

export const fetchPlayers = async (roomKey) => {
  try {
    const res = await fetch(`${GET_PLAYERS_ROUTE}/${roomKey}`);
    if (!res.ok) throw new Error("Failed to fetch players");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("FetchPlayers error:", err);
    throw err;
  }
};
