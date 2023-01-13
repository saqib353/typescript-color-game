import { configureStore } from '@reduxjs/toolkit';
import boxesSlice from './features/boxesSlice';

export const store = configureStore({
  reducer: {
    boxes: boxesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
