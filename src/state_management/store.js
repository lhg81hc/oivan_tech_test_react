import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/state_management/slices/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer
  },
});
