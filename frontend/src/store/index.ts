import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postsSlice from "./postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;