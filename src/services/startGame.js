import { START_GAME_ROUTE } from "../consts/consts";
import { toast } from 'react-toastify';


export default async function startGame(roomKey, userId) {
  try {
    const response = await fetch(START_GAME_ROUTE(roomKey), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });


    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to start the game");
    }

    const updatedRoom = await response.json();

    return updatedRoom;
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong. Please try again.");
  }
}
