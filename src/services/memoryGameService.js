import { toast } from "react-toastify";

export const MEMORY_GAME_MESSAGES = {
  YOUR_TURN: "🎯 Your Turn!",
  PLAYER_LEFT: (name) => `🚪 ${name} left the game.`,
  GAME_OVER: "🏁 Game over!",
  INVALID_MOVE: "🚫 Not your turn",
  CARD_ALREADY_FLIPPED: "🃏 Card already flipped",
};

export const notifyPlayerLeft = (name) => {
  toast.info(MEMORY_GAME_MESSAGES.PLAYER_LEFT(name), {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
  });
};

export const notifyYourTurn = () => {
  toast.info(MEMORY_GAME_MESSAGES.YOUR_TURN, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
  });
};