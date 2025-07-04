import { createSlice } from "@reduxjs/toolkit";
import { blackColor, flipBackCardReducerActivated, memoryGame, updateRedux } from "../storeStrings";

const initialState = {
  roomKey: "",
  host: {},
  users: {},
  scoreboard: [],
  cards: [],
  words: { heWords: [], enWords: [] },
  end: false,
  gameTypeId: "",
  currentTurn: null,
};

function resetFlipped(cards, firstId, secondId) {
  return cards.map(card =>
    card.id === firstId || card.id === secondId
      ? { ...card, flipped: false }
      : card
  );
}

const memoryGameSlice = createSlice({
  name: memoryGame,
  initialState,
  reducers: {
    setMemoryGameState: (state, {payload} ) => {
      console.log(updateRedux, JSON.stringify(payload, null, 2));

      state.roomKey = payload.roomKey || state.roomKey;
      state.host = payload.host ?? state.host;
      state.users = payload.users || state.users;
      state.end = payload.end ?? state.end;
      state.gameTypeId = payload.gameTypeId || state.gameTypeId;
      state.currentTurn = payload.turn ?? state.currentTurn;

   
      if (payload.words?.heWords && payload.words?.enWords) {
        state.words = payload.words;
        state.cards = payload.words.allCards || [...payload.words.heWords, ...payload.words.enWords];
      }


      state.scoreboard = Object.entries(state.users || {}).map(([userId, user]) => ({
        userId,
        name: user.name,
        score: user.score || 0,
        color: user.color || blackColor,
        isGuest: user.isGuest || false,
      }));
    },

    flipBackCards: (state, { payload }) => {
      console.log(flipBackCardReducerActivated, payload);
      const [firstId, secondId] = payload;
      const updatedHe = resetFlipped(state.words.heWords, firstId, secondId);
      const updatedEn = resetFlipped(state.words.enWords, firstId, secondId);
      const updatedCards = resetFlipped(state.cards, firstId, secondId);

      state.words.heWords = updatedHe;
      state.words.enWords = updatedEn;
      state.cards = updatedCards;
    },

    resetMemoryGameState: () => initialState,
  },
});

export const { setMemoryGameState, resetMemoryGameState, flipBackCards } = memoryGameSlice.actions;
export default memoryGameSlice.reducer;
