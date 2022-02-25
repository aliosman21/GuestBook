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