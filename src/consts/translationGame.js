export const TRANSLATION_GAME_EVENTS = {
  JOIN: "translation-game/join",
  LEAVE: "translation-game/leave",
  SET_STATE: "translation-game/set-state",
  START: "translation-game/start",
  END: "translation-game/end",
  SEND_MESSAGE: "translation-game/send-message",
  RECEIVE_MESSAGE: "translation-game/receive-message",
  UPDATE_SCORE: "translation-game/update-score",
  MATCH_WORD: "translation-game/match-word",
  MATCH_FEEDBACK: "translation-game/match-feedback",
  END_GAME_MESSAGE: "translation-game/end-game-message",
};

export const TRANSLATION_GAME_ASSETS_PATH = {
  BOAT: "/translation_game/boat.png",
  BUCKET: "/translation_game/bucket.png",
  FISH: (id = 1) => `/translation_game/fish-${id}.png`,
};
