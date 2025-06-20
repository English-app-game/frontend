import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./slices/roomSlice";
import userReducer from "./slices/userSlice";
import memoryGameReducer from "./slices/memoryGameSlice";
import translationGameReducer from "./slices/translationGameSlice";
export const store = configureStore({
  reducer: {
    room: roomReducer,
    user: userReducer,
    translationGame: translationGameReducer,
    memoryGame: memoryGameReducer, 
  },
});
