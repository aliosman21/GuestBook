import { configureStore } from "@reduxjs/toolkit";
import TokenReducer from "./TokenSlice";
export default configureStore({
   reducer: {
      tokenStore: TokenReducer,
   },
});
