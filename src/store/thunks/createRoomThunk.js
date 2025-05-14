// roomThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addRoomToDB } from "../../services/room/addRoomToDB";

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (roomData, thunkAPI) => {
    const response = await addRoomToDB(roomData, thunkAPI);
    return response;
  }
);
