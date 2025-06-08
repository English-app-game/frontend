export function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function revealCardById(cards, cardId) {
  return cards.map(card =>
    card.id === cardId ? { ...card, isRevealed: true } : card
  );
}

export function hideTwoCards(cards, firstId, secondId) {
  return cards.map(card =>
    card.id === firstId || card.id === secondId
      ? { ...card, isRevealed: false }
      : card
  );
}

export function isMatch(cardA, cardB) {
  return cardA.matchId === cardB.matchId;
}





