import { createSlice } from "@reduxjs/toolkit";

export const TokenSlice = createSlice({
   name: "Token",
   initialState: {
      token: "",
   },
   reducers: {
      setToken: (state, data) => {
        state.token = data.payload;
      },
   },
});

export const { setToken } = TokenSlice.actions;

export default TokenSlice.reducer;