const ROOMS_API_URL = "http://localhost:5000/api/rooms";
const ROOM_BY_KEY_ROUTE= "check";

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

export const checkRoomAvailabilityByKey = async (roomKey) => {
  const res = await fetch(`${ROOMS_API_URL}/${ROOM_BY_KEY_ROUTE}/${roomKey}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Room not available");
  }

  return data;  
};