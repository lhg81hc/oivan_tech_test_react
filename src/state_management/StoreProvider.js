'use client';

import { Provider } from "react-redux";
import { store } from "@/state_management/store";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
