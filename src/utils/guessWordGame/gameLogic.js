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
