import { RANDOM_WORD_API_URL, DEFAULT_WORD_AMOUNT } from "../consts/consts.js";

export async function fetchRandomWords(amount = DEFAULT_WORD_AMOUNT) {
  const response = await fetch(`${RANDOM_WORD_API_URL}?words=${amount}&swear=0`);

  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }

  return await response.json();
}
