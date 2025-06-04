import { BASE_URL } from "../../consts/consts";

export const fetchRooms = async () => {
  try {
    const res = await fetch(`${BASE_URL}/rooms`);
    if (!res.ok) throw new Error("Failed to fetch rooms");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ fetchRooms error:", err);
    throw err;
  }
};