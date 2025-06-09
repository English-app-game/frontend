import { useState, useEffect } from "react";
import WordCard from "../pages/MemoryGame/WordCard";
import { shuffleArray, revealCardById, hideTwoCards, isMatch } from "../../utils/memoryGameLogic";
import ExitButton from "../../ui/components/ExitButton";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../src/routes/routes_consts";
import axios from "axios";

export default function ActiveRoom() {
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

  const [selectedCards, setSelectedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const navigate = useNavigate();
  const { id: roomKey } = useParams();

  const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));

  const handleCardClick = async (cardId) => {
    if (lockBoard) return;

    const clickedCard = cards.find((card) => card.id === cardId);
    if (clickedCard.isRevealed) return;

    try {
      setCards(prev => revealCardById(prev, cardId));
      const newSelected = [...selectedCards, clickedCard];
      setSelectedCards(newSelected);

      if (newSelected.length === 2) {
        const [first, second] = newSelected;

        if (isMatch(first, second)) {
          console.log("✅ Match found!");
          setSelectedCards([]);

          await axios.post("http://localhost:5000/api/memorygame/update-score", {
            roomKey,
            userId: user._id,
            points: 10
          });

        } else {
          setLockBoard(true);
          setTimeout(() => {
            setCards(prev => hideTwoCards(prev, first.id, second.id));
            setSelectedCards([]);
            setLockBoard(false);
          }, 1000);
        }
      }

      const allMatched = cards.every((card) => card.isRevealed || card.id === cardId);
      if (allMatched) {
        console.log("🏁 All cards matched, finalizing score...");
        await axios.post("http://localhost:5000/api/memorygame/finalize-score", {
          roomKey
        });
      }

    } catch (error) {
      console.error("❌ Error in game logic or API:", error);
    }
  };

  const handleExit = () => {
    axios.post("http://localhost:5000/api/memorygame/clear-room", { roomKey });
    navigate(ROUTES.ROOMS_LIST);
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
