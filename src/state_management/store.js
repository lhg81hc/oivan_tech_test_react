import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/slices/apiSlice";
import authReducer from "@/state_management/slices/authSlice";
import userReducer from "@/state_management/slices/userSlice";
import urlReducer from "@/state_management/slices/urlSlice";
import modalReducer from "@/state_management/slices/modalSlice";

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
