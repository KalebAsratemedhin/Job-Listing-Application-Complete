import { apiSlice } from '@/app/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit'
import bookmarkReducer from "./api/bookmarkSlice"


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    bookmarks: bookmarkReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;