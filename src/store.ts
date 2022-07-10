import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './redux/locationSlice';

export const store = configureStore({
  reducer: {
      location: locationReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
