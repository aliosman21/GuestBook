import { createSlice } from "@reduxjs/toolkit";

export const TokenSlice = createSlice({
   name: "Token",
   initialState: {
      token: "",
      id: 0,
   },
   reducers: {
      setToken: (state, data) => {
         state.token = data.payload;
      },
      setId: (state, data) => {
         state.id = data.payload;
      },
      clearAll: (state) => {
         state.id = 0;
         state.token = "";
      },
   },
});
export const AlertSlice = createSlice({
   name: "Alert",
   initialState: {
      Message: "Some basic message",
      isVisible: false,
   },
   reducers: {
      setAlertInfo: (state, data) => {
         state.isVisible = data.payload.visible;
         state.Message = data.payload.message;
      },
   },
});
