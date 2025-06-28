import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WordCard from "./WordCard";
import ExitButton from "../../components/ExitButton";
import { ROUTES } from "../../../routes/routes_consts";
import { useMemoryGameSocket } from "../../../hooks/useMemoryGameUseSocket";
import LiveScore from "./LiveScore";
import ScoreResultModal  from "./ScoreResultModal";
import { toast } from "react-toastify";
import {YOUR_TURN_MSG} from "../../../consts/consts";
import { notifyYourTurn } from "../../../services/memoryGameService";


export default function MemoryGame() {
  const { id: roomKey } = useParams();
  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.memoryGame);
  const currentTurnPlayer = game.users?.[game.currentTurn];
  const previousTurnRef = useRef(null);


  console.log("📦 MemoryGame state:", game);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { emit,requestFlipCard, requestMatchCheck } = useMemoryGameSocket(roomKey, () => {
  setShowScoreModal(true);
  });

  const [selectedCards, setSelectedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);


  console.log("🧠 Rendering MemoryGame with:", game);

  useEffect(() => {
    console.log("🚀 useEffect running in useMemoryGameSocket");
    console.log("roomKey from hook:", roomKey);
    console.log("user from hook:", user);

    if (
      !user?.id ||
      !game ||
      !game.words?.heWords?.length ||
      !game.words?.enWords?.length
    )
      return;
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      setLockBoard(true);
      requestMatchCheck(
        user.id,
        { id: first.id, lang: first.lang },
        { id: second.id, lang: second.lang },
        ({ match }) => {
          setLockBoard(false);
          setSelectedCards([]);
          if (!match) {
            setTimeout(() => {
              setLockBoard(false);
            }, 1000);
          } else {
            setLockBoard(false);
          }
        }
      );
    }
  }, [selectedCards, user?.id, game, lockBoard]);

  useEffect(() => {
  if (!game || !user?.id) return;
  
  const prevTurn = previousTurnRef.current;
  const currTurn = game.currentTurn;

  if (game.currentTurn === user.id && prevTurn !== user.id) {
    notifyYourTurn();
    }
    
  previousTurnRef.current = currTurn;

}, [game.currentTurn, user?.id]);


  const handleExit = () => {
    navigate(ROUTES.ROOMS_LIST);
  };

  const handleCardClick = (card) => {
    console.log("🖱️ Card clicked:", card);
    console.log("🔒 lockBoard:", lockBoard);
    console.log("🧑‍🦱 userId:", user.id);
    console.log("🎯 current turn:", game?.currentTurn);
    if (lockBoard || user.id !== game?.currentTurn) return;
    if (card.flipped || card.matched) return;

    requestFlipCard(user.id, card.id, card.lang, ({ success }) => {
      if (!success) return;
      setSelectedCards((prev) => [...prev, card]);
    });
  };

  if (
    !game ||
    !game.words ||
    !Array.isArray(game.words.heWords) ||
    !Array.isArray(game.words.enWords)
  ) {
    console.log("🕐 Waiting for game data...", game);
    return <div className="text-white text-xl">Loading game...</div>;
  }

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] flex items-center justify-center relative">
      <LiveScore />
      <div className="absolute top-4 left-4">
        <ExitButton
          onClick={handleExit}
          className="bg-rose-300 border-4 border-orange-600 hover:bg-rose-400"
        >
          EXIT ROOM
        </ExitButton>
      </div>

      <div className="flex flex-wrap w-[640px] gap-4 justify-center">
        {[...game.words.heWords, ...game.words.enWords].map((card) => (
          <WordCard
            key={card.id + card.text}
            word={card.text}
            isRevealed={card.flipped}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
       {showScoreModal && <ScoreResultModal onClose={handleExit} />}
    </div>
  );
}
