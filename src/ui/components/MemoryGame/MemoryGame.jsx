// import { useState, useEffect } from "react";
// import WordCard from './WordCard';
// import { shuffleArray, revealCardById, hideTwoCards, isMatch } from "../../../utils/memoryGameLogic";
// import ExitButton from "../../components/ExitButton";
// import { useNavigate, useParams } from "react-router-dom";
// import { ROUTES } from "../../../routes/routes_consts";
// import { useSelector } from "react-redux";
//  import { socket } from "../../../../src/sockets/sockets";
//  import {useSocket} from "../../../hooks/useSocket";
//  import { fetchPlayersInRoom } from "../../../services/room/getPlayers";
//  import useRoomPolling from "../../../hooks/useRoomPolling";
// import {
//   emitStartMemoryGame,
//   emitPlayerScored,
//   emitTurnEnded,
// } from "../../../services/memoryGameEmitters";
// import { MEMORY_GAME_EVENTS } from "../../../consts/memoryGameEvents";


// export default function MemoryGame() {
//   const { id: roomKey } = useParams();
//   const user = useSelector((state) => state.user);
//   const { socket, emit } = useSocket();
//   const navigate = useNavigate();

//   const [cards, setCards] = useState([]);
//   const [selectedCards, setSelectedCards] = useState([]);;
//   const [lockBoard, setLockBoard] = useState(false);
//   const [players, setPlayers] = useState([]);
//   const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState(null);

//   useRoomPolling(roomKey);


//   const wordPairs = [
//     { en: "apple", he: "תפוח" },
//     { en: "dog", he: "כלב" },
//     { en: "house", he: "בית" },
//     { en: "sun", he: "שמש" },
//     { en: "book", he: "ספר" },
//     { en: "car", he: "מכונית" },
//     { en: "tree", he: "עץ" },
//     { en: "water", he: "מים" },
//     { en: "music", he: "מוזיקה" },
//     { en: "school", he: "בית ספר" },
//   ];

//   useEffect(()=>{
//     const shuffled = shuffleArray(
//       wordPairs.flatMap((pair, index) => [
//         { id: `en-${index}`, word: pair.en, matchId: index, isRevealed: false },
//         { id: `he-${index}`, word: pair.he, matchId: index, isRevealed: false },
//       ])
//     );
//     setCards(shuffled);

//   },[]);

//    useEffect(() => {
//     const loadPlayers = async () => {
//       const { players } = await fetchPlayersInRoom(roomKey);
//       console.log("👥 Players fetched:", players);
//       setPlayers(players);

//       console.log("💡 user id:", user?.id);
//       console.log("💡 first player id:", players[0]?._id);
//       if (players.length > 0  && user?.id === players[0]?._id) {
//           console.log("🎮 I'm the host, emitting start game!");
//           emitStartMemoryGame(emit, { roomKey, players });
//       }
//     };

//     loadPlayers();
//   }, [roomKey, user?.id, emit]);

//   useEffect(() => {
//   socket.on(MEMORY_GAME_EVENTS.TURN_CHANGED, (playerId) => {
//     console.log("🎯 Turn changed to:", playerId);
//     setCurrentTurnPlayerId(playerId);
//   });

//   socket.on(MEMORY_GAME_EVENTS.SCORE_UPDATED, (scoreboard) => {
//     console.log("📊 Scoreboard:", scoreboard);
//   });

//   return () => {
//     socket.off(MEMORY_GAME_EVENTS.TURN_CHANGED);
//     socket.off(MEMORY_GAME_EVENTS.SCORE_UPDATED);
//   };
// }, [socket]);


//     const handleExit = () => {
//     navigate(ROUTES.ROOMS_LIST);
//   };

//    const handleCardClick = (cardId) => {
//     console.log("👤 Current turn:", currentTurnPlayerId, " | This user:", user.id);
//     if (lockBoard || user.id !== currentTurnPlayerId) return;

//     const clickedCard = cards.find((card) => card.id === cardId);
//     if (!clickedCard || clickedCard.isRevealed) return;

//     const newCards = revealCardById(cards, cardId);
//     setCards(newCards);
//     const newSelected = [...selectedCards, clickedCard];
//     setSelectedCards(newSelected);

//     if (newSelected.length === 2) {
//       const [first, second] = newSelected;

//       if (isMatch(first, second)) {
//        //update board
//         const updated = newCards.map((card) =>
//           card.matchId === first.matchId ? { ...card, isRevealed: true } : card
//         );
//         setCards(updated);
//         setSelectedCards([]);

//         emitPlayerScored(emit, { roomKey, userId: user.id });


//         // end game ??
//         const allRevealed = updated.every((c) => c.isRevealed);
//         if (allRevealed) {
//           navigate(ROUTES.GAME_OVER);
//         }
//       } else {
//         setLockBoard(true);
//         setTimeout(() => {
//           setCards((prev) =>
//             hideTwoCards(prev, first.id, second.id)
//           );
//           setSelectedCards([]);
//           setLockBoard(false);
//           emitTurnEnded(emit, { roomKey });
//         }, 1000);
//       }
//     }
//   };

 
//   return (

//     <div className="min-h-screen bg-[url('/homePage.png')] flex items-center justify-center relative">
//       <div className="absolute top-4 left-4">
//         <ExitButton
//           onClick={handleExit}
//           className="bg-rose-300 border-4 border-orange-600 hover:bg-rose-400"
//         >
//           EXIT ROOM
//         </ExitButton>
//       </div>

//       <div className="flex flex-wrap w-[640px] gap-4 justify-center">
//         {cards.map((card) => (
//           <WordCard
//             key={card.id}
//             word={card.word}
//             isRevealed={card.isRevealed}
//             onClick={() => handleCardClick(card.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// } 


//----------------------------------------------------------------------------------------------------------------
// 📁 FILE: client/pages/games/memorygame/MemoryGame.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WordCard from "./WordCard";
import ExitButton from "../../components/ExitButton";
import { ROUTES } from "../../../routes/routes_consts";
import memoryGameUseSocket from "../../../hooks/memoryGameUseSocket";

export default function MemoryGame() {
  const { id: roomKey } = useParams();
  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.memoryGame);

  console.log("📦 MemoryGame state:", game);
  // console.log("🎴 heWords:", game.words?.heWords);
  // console.log("🎴 enWords:", game.words?.enWords);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const socketHandlers = user?.id ? memoryGameUseSocket(roomKey) : null;
  const { requestFlipCard, requestMatchCheck } = memoryGameUseSocket(roomKey);
 
  const [selectedCards, setSelectedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);

  console.log("🧠 Rendering MemoryGame with:", game);

  useEffect(() => {
    console.log("🚀 useEffect running in useMemoryGameSocket");
    console.log("roomKey from hook:", roomKey);
    console.log("user from hook:", user);

    if (!user?.id  || !game || !game.words?.heWords?.length || !game.words?.enWords?.length) return;
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      setLockBoard(true);
      requestMatchCheck(user.id, first.id, second.id, ({ match }) => {
        setLockBoard(false);
        setSelectedCards([]);
        if (!match) {
        }
      });
    }
  }, [selectedCards, user?.id, game, lockBoard]);

  const handleExit = () => {
    navigate(ROUTES.ROOMS_LIST);
  };

  const handleCardClick = (card) => {
    if (lockBoard || user.id !== game?.turn) return;
    if (card.flipped || card.matched) return;

    requestFlipCard(user.id, card.id, ({ success }) => {
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
    </div>
  );
}
