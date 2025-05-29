export const fetchPlayers = async (roomKey) => {
  try {
    const res = await fetch(`http://localhost:5000/api/rooms/players/${roomKey}`);
    if (!res.ok) throw new Error("Failed to fetch players");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("FetchPlayers error:", err);
    throw err;
  }
};