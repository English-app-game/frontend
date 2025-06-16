import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomKey: "",
  host: {},
  users: {}, // { [userId]: { socketId, id, name, email, avatarImg, color } }
  scoreboard: [], // [{ userId, name, score }]
  words: [], // [{ id, heb, eng, lock, disabled, heldBy }]
  end: false,
};

const translationGameSlice = createSlice({
  name: "translationGame",
  initialState,
  reducers: {
    setTranslationGameState: (state, { payload }) => {
      Object.assign(state, payload);

      state.scoreboard = Object.entries(state.users).map(([userId, user]) => ({
        userId,
        name: user.name,
        score: user.score || 0,
        color: user.color || "#000000",
        isGuest: user.isGuest ? true : false,
      }));
    },
    lockHebrewWord: (state, action) => {
      const { wordId, userId } = action.payload;
      const word = state.words.find((w) => w.id === wordId);
      if (!word) return;

      if (word.heldBy === userId) {
        word.heb.lock = false;
        word.heldBy = null;
      } else if (!word.heldBy) {
        // lock it
        word.heb.lock = true;
        word.heldBy = userId;
      }
    },
    resetTranslationGameState: () => initialState,
  },
});

export const {
  setTranslationGameState,
  resetTranslationGameState,
  lockHebrewWord,
} = translationGameSlice.actions;
export default translationGameSlice.reducer;
