import { useState, useEffect } from "react";
import WordCard from './WordCard';
import { shuffleArray, revealCardById, hideTwoCards, isMatch } from "../../../utils/memoryGameLogic";
import ExitButton from "../../components/ExitButton";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../routes/routes_consts";
import { useSelector } from "react-redux";
 import { socket } from "../../../../src/sockets/sockets";
 import {useSocket} from "../../../hooks/useSocket";
 import { fetchPlayersInRoom } from "../../../services/room/getPlayers";
 import useRoomPolling from "../../../hooks/useRoomPolling";


export default function MemoryGame() {
  const { id: roomKey } = useParams();
  const user = useSelector((state) => state.user);
  const { socket, emit } = useSocket();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);;
  const [lockBoard, setLockBoard] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState(null);

  useRoomPolling(roomKey);


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

  useEffect(()=>{
    const shuffled = shuffleArray(
      wordPairs.flatMap((pair, index) => [
        { id: `en-${index}`, word: pair.en, matchId: index, isRevealed: false },
        { id: `he-${index}`, word: pair.he, matchId: index, isRevealed: false },
      ])
    );
    setCards(shuffled);

  },[]);

   useEffect(() => {
    const loadPlayers = async () => {
      const { players } = await fetchPlayersInRoom(roomKey);
      setPlayers(players);

      if (user?.id === players[0]?.id) {
        emit("start-memory-game", { roomKey, players });
      }
    };

    loadPlayers();
  }, [roomKey, user?.id, emit]);

  useEffect(() => {
    socket.on("turn-changed", (playerId) => {
      setCurrentTurnPlayerId(playerId);
    });

    socket.on("score-updated", (scoreboard) => {
      console.log("📊 Scoreboard:", scoreboard);
    });

    return () => {
      socket.off("turn-changed");
      socket.off("score-updated");
    };
  }, [socket]);

    const handleExit = () => {
    navigate(ROUTES.ROOMS_LIST);
  };

   const handleCardClick = (cardId) => {
    if (lockBoard || user.id !== currentTurnPlayerId) return;

    const clickedCard = cards.find((card) => card.id === cardId);
    if (!clickedCard || clickedCard.isRevealed) return;

    const newCards = revealCardById(cards, cardId);
    setCards(newCards);
    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;

      if (isMatch(first, second)) {
       //update board
        const updated = newCards.map((card) =>
          card.matchId === first.matchId ? { ...card, isRevealed: true } : card
        );
        setCards(updated);
        setSelectedCards([]);

        emit("player-scored", { roomKey, userId: user.id });

        // end game ??
        const allRevealed = updated.every((c) => c.isRevealed);
        if (allRevealed) {
          navigate(ROUTES.GAME_OVER);
        }
      } else {
        setLockBoard(true);
        setTimeout(() => {
          setCards((prev) =>
            hideTwoCards(prev, first.id, second.id)
          );
          setSelectedCards([]);
          setLockBoard(false);
          emit("turn-ended", { roomKey });
        }, 1000);
      }
    }
  };

 
  return (

    <div className="min-h-screen bg-[url('/homePage.png')] flex items-center justify-center relative">
      <div className="absolute top-4 left-4">
        <ExitButton
          onClick={handleExit}
          className="bg-rose-300 border-4 border-orange-600 hover:bg-rose-400"
        >
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