import { configureStore } from "@reduxjs/toolkit";
import { TokenSlice, AlertSlice } from "./TokenSlice";
export const store = configureStore({
   reducer: {
      tokenStore: TokenSlice.reducer,
      AlertStore: AlertSlice.reducer,
   },
});
