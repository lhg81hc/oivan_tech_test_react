import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice";
import authReducer from "@/state_management/slices/authSlice";
import themeReducer from "@/state_management/slices/themeSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,

});
