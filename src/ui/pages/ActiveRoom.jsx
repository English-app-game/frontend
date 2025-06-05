import { useState } from "react";
import WordCard from '../pages/MemoryGame/WordCard';

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function ActiveRoom() {

/// Gil it will be change!!!!!!!!!!!!!!!!!
  const wordPairs = [
    { en: "apple", he: "תפוח" },
    { en: "dog", he: "כלב" },
    { en: "house", he: "בית" },
    { en: "sun", he: "שמש" },
    { en: "book", he: "ספר" },
    { en: "car", he: "מכונית" },
    { en: "tree", he: "עץ" },
    { en: "water", he: "מים" },
    { en: "music", he: "מוזיקה" },
    { en: "school", he: "בית ספר" },
  ];

  const [cards, setCards] = useState(() =>
    shuffleArray(
      wordPairs.flatMap((pair, index) => [
        {
          id: `en-${index}`,
          word: pair.en,
          matchId: index,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: `he-${index}`,
          word: pair.he,
          matchId: index,
          isRevealed: false,
          isMatched: false,
        }
      ])
    )
  );

  const [selectedCards, setSelectedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);

  const handleCardClick = (cardId) => {
    
    if (lockBoard) return;
    const clickedCard = cards.find((card) => card.id === cardId);
    if (clickedCard.isRevealed || clickedCard.isMatched) return;

    const newCards = cards.map((card) =>
      card.id === cardId ? { ...card, isRevealed: true } : card
    );
    setCards(newCards);

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (first.matchId === second.matchId) {
        setCards((prev) =>
          prev.map((card) =>
            card.matchId === first.matchId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setSelectedCards([]);
      } else {
        setLockBoard(true);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isRevealed: false }
                : card
            )
          );
          setSelectedCards([]);
          setLockBoard(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] flex items-center justify-center">
      <div className="flex flex-wrap w-[640px] gap-4 justify-center">
        {cards.map((card) => (
          <WordCard
            key={card.id}
            word={card.word}
            isRevealed={card.isRevealed || card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
}


