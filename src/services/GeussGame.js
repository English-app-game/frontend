import { DEFAULT_WORD_AMOUNT, ALL_WORDS } from "../consts/consts.js";

export async function fetchRandomWords(roomLevel, amount = DEFAULT_WORD_AMOUNT) {
  const response = await fetch(`${ALL_WORDS}?amount=${amount}&level=${roomLevel}`);

  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }
  
  return await response.json();
}
