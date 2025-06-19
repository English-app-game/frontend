import { createSlice } from "@reduxjs/toolkit";

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

const memoryGameSlice = createSlice({
  name: "memoryGame",
  initialState,
  reducers: {
    setMemoryGameState: (state, payload ) => {
      console.log("📥 Updating Redux with game payload:", JSON.stringify(payload, null, 2));

      state.roomKey = payload.roomKey || state.roomKey;
      state.host = payload.host ?? state.host;
      state.users = payload.users || state.users;
      state.end = payload.end ?? state.end;
      state.gameTypeId = payload.gameTypeId || state.gameTypeId;
      state.currentTurn = payload.turn ?? state.currentTurn;

   
      if (payload.words?.heWords && payload.words?.enWords) {
        state.words = payload.words;
        state.cards = [...payload.words.heWords, ...payload.words.enWords];
      }


      state.scoreboard = Object.entries(state.users || {}).map(([userId, user]) => ({
        userId,
        name: user.name,
        score: user.score || 0,
        color: user.color || "#000000",
        isGuest: user.isGuest || false,
      }));
    },

    resetMemoryGameState: () => initialState,
  },
});

export const { setMemoryGameState, resetMemoryGameState } = memoryGameSlice.actions;
export default memoryGameSlice.reducer;
