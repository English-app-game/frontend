export async function fetchRandomWords(amount = 500) {
  const response = await fetch(`https://random-word-api.vercel.app/api?words=${amount}&swear=0`);
  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }
  return await response.json();
}
