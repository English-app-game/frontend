import { createSlice } from "@reduxjs/toolkit";
import { GameTypes, RoomStatus } from "../../consts/gameTypes";
import { createRoom as createRoomMiddleware } from "../thunks/createRoomThunk";
import { room } from "../storeStrings";

// Initial State aligned with your GameRoom schema
const initialState = {
  key: "", //string, required
  amountOfPlayers: 0, //int, required
  maxPlayers: 0, // int , required
  players: [
    // User[]
    // {
    //   userId: '',
    //   name: '',
    // }
  ],
  gameType: GameTypes.TRANSLATION, // GameType, required
  level: "", // string, required
  // this is roomId
  // key: null, // string, not required
  isActive: false, // boolean, true
  admin: {
    // User, required
    userId: "",
    name: "",
    avatarImg: "",
  },
  currentStatus: RoomStatus.WAITING, // 'waiting' | 'playing' | 'finished' | 'error', required
  createdAt: "", // required
  finishedAt: null, //optional
  chat: [
    // Record<User.name, Message> -- User.name is typeof string, message is typeof string, so techincally Record<string, string>.
    // {
    //   user: '',
    //   message: ''
    // }
  ],
};

const roomSlice = createSlice({
  name: room,
  initialState,
  reducers: {
    setRoom: (state, action) => {
      return {
        ...action.payload,
        finishedAt: action.payload.finishedAt || null,
        chat: action.payload.chat || [],
      };
    },
    startGame: (state) => {
      state.isActive = true;
      state.currentStatus = RoomStatus.PLAYING;
      state.finishedAt = null;
      state.chat = [];
    },
    resetRoom: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createRoomMiddleware.fulfilled, (state, action) => {
      const room = action.payload;
      state.key = room.key;
      state.amountOfPlayers = room.amountOfPlayers;
      state.maxPlayers = room.maxPlayers;
      state.players = room.players;
      state.gameType = room.gameType;
      state.level = room.level;
      state.isActive = room.isActive;
      state.admin = room.admin;
      state.currentStatus = room.currentStatus;
      state.createdAt = room.createdAt;
      state.finishedAt = room.finishedAt || null;
      state.chat = room.chat || [];
    });
  },
});

export const { setRoom, resetRoom, startGame } = roomSlice.actions;
export default roomSlice.reducer;
