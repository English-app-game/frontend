import { MAX_WORDS_PER_DIFFICULTY } from "../consts/consts";

export function splitWordsByDifficulty(words, maxPerLevel = MAX_WORDS_PER_DIFFICULTY) {
  const easy = [];
  const medium = [];
  const hard = [];

  for (const word of words) {
    if (typeof word !== "string") continue;

    const length = word.length;
    if (length <= 3 && easy.length < maxPerLevel) {
      easy.push(word);
    } else if (length >= 4 && length <= 6 && medium.length < maxPerLevel) {
      medium.push(word);
    } else if (length > 6 && hard.length < maxPerLevel) {
      hard.push(word);
    }

    if (
      easy.length === maxPerLevel &&
      medium.length === maxPerLevel &&
      hard.length === maxPerLevel
    ) {
      break;
    }
  }

  return { easy, medium, hard };
}

export function pickMissingIndexes(word, num = 1) {
  if (!word) return [];

  const positions = [...word].map((_, i) => i);
  const numMissing = Math.min(num, word.length);
  return positions
    .sort(() => Math.random() - 0.5)
    .slice(0, numMissing);
}

export function isGuessComplete(word, missingIdxs, guesses) {
  return missingIdxs.every((i) =>
    guesses.includes(word[i].toLowerCase())
  );
}
