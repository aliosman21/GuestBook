import { configureStore } from "@reduxjs/toolkit";
import { TokenSlice } from "./TokenSlice";
export const store = configureStore({
   reducer: {
      tokenStore: TokenSlice.reducer,
   },
});
