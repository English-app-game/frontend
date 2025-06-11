import { useState } from "react";
import WordCard from './WordCard';
import { shuffleArray, revealCardById, hideTwoCards, isMatch } from "../../../utils/memoryGameLogic";
import ExitButton from "../../components/ExitButton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes_consts";

export default function MemoryGame({ roomKey }) {
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
        { id: `en-${index}`, word: pair.en, matchId: index, isRevealed: false },
        { id: `he-${index}`, word: pair.he, matchId: index, isRevealed: false }
      ])
    )
  );

  const navigate = useNavigate();
  const handleExit = () => {
    navigate(ROUTES.ROOMS_LIST);
  };

  const [selectedCards, setSelectedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);

  const handleCardClick = (cardId) => {
    if (lockBoard) return;

    const clickedCard = cards.find(card => card.id === cardId);
    if (!clickedCard || clickedCard.isRevealed) return;

    try {
      setCards(prev => revealCardById(prev, cardId)); //showing the card
      const newSelected = [...selectedCards, clickedCard];
      setSelectedCards(newSelected); //insert the card into an array of 2 selected cards

      if (newSelected.length === 2) {
        const [first, second] = newSelected;

        if (isMatch(first, second)) {
          setSelectedCards([]); //the cards will not be hide along the game
        } else {
          setLockBoard(true);
          setTimeout(() => {
            setCards(prev => hideTwoCards(prev, first.id, second.id));
            setSelectedCards([]);
            setLockBoard(false);
          }, 1000);
        }
      }
    } catch (err) {
      console.error("Error in handleCardClick:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] flex items-center justify-center relative">
      <div className="absolute top-4 left-4">
        <ExitButton onClick={handleExit} className="bg-rose-300 border-4 border-orange-600 hover:bg-rose-400">
          EXIT ROOM
        </ExitButton>
      </div>

      <div className="flex flex-wrap w-[640px] gap-4 justify-center">
        {cards.map((card) => (
          <WordCard
            key={card.id}
            word={card.word}
            isRevealed={card.isRevealed}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
} 