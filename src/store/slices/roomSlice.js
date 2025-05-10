import { createSlice } from "@reduxjs/toolkit";
import { GameTypes, RoomStatus } from "../../consts/gameTypes";
import { formatDateAndTime } from "../../services/dateService";

// Initial State aligned with your GameRoom schema
const initialState = {
  roomId: "", //string, required
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
  key: null, // string, not required
  isActive: false, // boolean, true
  admin: {
    // User, required
    userId: "",
    name: "",
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
  name: "room",
  initialState,
  reducers: {
    createRoom(state, action) {
      const { newRoomId: roomId, TEMP_USER, level, status } = action.payload;

      state.roomId = roomId;
      state.amountOfPlayers = 1;
      state.maxPlayers = 4; // or dynamically based on game type
      state.players = [TEMP_USER];
      state.gameType = GameTypes.TRANSLATION;
      state.level = level;
      state.key = null;
      state.isActive = true;
      state.admin = {
        userId: TEMP_USER.userId,
        name: TEMP_USER.name,
      };
      state.currentStatus = status;
      state.createdAt = formatDateAndTime(new Date());
      state.finishedAt = null;
      state.chat = [];
    },
  },
});

export const { createRoom } = roomSlice.actions;
export default roomSlice.reducer;
