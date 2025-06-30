import { createSlice } from "@reduxjs/toolkit";
import { userS } from "../../consts/strings";

const initialState = {
  id: "",
  name: "",
  email: "",
  avatarImg: "",
};

const userSlice = createSlice({
  name: userS,
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (state.id === action.payload.id) return state;
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
