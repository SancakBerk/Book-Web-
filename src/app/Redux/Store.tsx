'use client';

import { configureStore } from '@reduxjs/toolkit';
import HomepageReducer from './Slices/HomepageSlice';

const store = configureStore({
  reducer: {
    HomepageReducer: HomepageReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch;
