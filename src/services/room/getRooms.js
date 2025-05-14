const ROOMS_API_URL = "http://localhost:5000/api/rooms";

export const fetchRooms = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/rooms");
    if (!res.ok) throw new Error("Failed to fetch rooms");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ fetchRooms error:", err);
    throw err;
  }
};