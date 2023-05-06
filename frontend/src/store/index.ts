import { configureStore } from "@reduxjs/toolkit";
import { vacationsSlice } from "./vacationsSlice";

export const store = configureStore({
  reducer: {
    vacationsState: vacationsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
