import { BASE_URL } from "../../consts/consts";

const ROOM_BY_KEY_ROUTE = "check";

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

export const checkRoomAvailabilityByKey = async (roomKey) => {
  const res = await fetch(`${BASE_URL}/rooms/${ROOM_BY_KEY_ROUTE}/${roomKey}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Room not available");
  }

  return data;  
};