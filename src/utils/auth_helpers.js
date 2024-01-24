"use client";

import { store } from "@/state_management/store";

export const isAuthenticated = () => {
  const user = store.getState().auth.user;
  return user !== null && user !== undefined;
}
