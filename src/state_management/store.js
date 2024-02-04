'use client';

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/slices/apiSlice";
import {
  authReducer,
  modalReducer,
  urlReducer,
  userReducer,
} from "./slices"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    modal: modalReducer,
    urls: urlReducer,
    users: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
