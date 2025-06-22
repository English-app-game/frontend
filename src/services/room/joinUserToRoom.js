import { JOIN_USER_ROOM_ROUTE } from "../../consts/consts";
import { toast } from 'react-toastify';


export async function joinUserToRoom(roomKey, userId, guestData = null, onError = null) {
  try {
    const requestBody = {
      roomKey,
      userId
    };

    if (guestData) {
      requestBody.guestData = guestData;
    }

    const res = await fetch(JOIN_USER_ROOM_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error("Failed to join the room");
    }

    const data = await res.json();
    console.log("Joined room successfully:", data);
  } catch (err) {
    toast.error("Failed to join the room.");

    
    if (onError && typeof onError === 'function') {
      onError();
    }
    
    return;
  }
}
