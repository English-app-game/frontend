import { START_GAME_ROUTE } from "../consts/consts";

export default async function startGame(roomKey) {
  try {
    const response = await fetch(START_GAME_ROUTE(roomKey), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to start the game");
    }

    const updatedRoom = await response.json();

    return updatedRoom;
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
}
