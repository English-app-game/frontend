import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomKey: "",
  host: null,
  users: {}, // { [userId]: { socketId, id, name, email, avatarImg, color } }
  scoreboard: [], // [{ userId, name, score }]
  words: [], // [{ id, heb, eng, lock, disabled, heldBy }]
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
      }));
    },
    resetTranslationGameState: () => initialState,
  },
});

export const { setTranslationGameState, resetTranslationGameState } =
  translationGameSlice.actions;
export default translationGameSlice.reducer;
