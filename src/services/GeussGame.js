import { DEFAULT_WORD_AMOUNT, ALL_WORDS, DELETE_ROOM_ROUTE } from "../consts/consts.js";

export async function fetchRandomWords(roomLevel, amount = DEFAULT_WORD_AMOUNT) {
  const response = await fetch(`${ALL_WORDS}?amount=${amount}&level=${roomLevel}`);

  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }
  
  return await response.json();
}

export async function deleteRoom(roomKey, userId) {
  const response = await fetch(DELETE_ROOM_ROUTE(roomKey), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    roomKey,  
    userId,
  }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete room: ${error}`);
  }

  return await response.json();
}