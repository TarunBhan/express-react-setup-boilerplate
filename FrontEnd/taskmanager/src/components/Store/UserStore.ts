import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const UserStore = configureStore({
  reducer: authSlice,
});
