import { createAsyncThunk } from "@reduxjs/toolkit";
import { addRoomToDB } from "../../services/room/addRoomToDB";

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (roomData, thunkAPI) => {
    const { token, ...roomDataWithoutToken } = roomData;
    const response = await addRoomToDB(roomDataWithoutToken, token, thunkAPI);
    return response;
  }
);
