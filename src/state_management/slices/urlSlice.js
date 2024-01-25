'use client'

import { createSlice } from "@reduxjs/toolkit";

export const urlsSlice = createSlice({
  name: 'urls',
  initialState: [],
  reducers: {
    setUrls(_state, action) {
      return action.payload
    },
    urlAdded(state, action) {
      return [action.payload, ...state]
    },
    urlUpdated(state, action) {
      return state.map((u)=> {
        if( u.id === action.payload.id ) {
          return action.payload
        } else {
          return u;
        }
      });
    },
    urlDeleted(state, action) {
      return state.filter(u => u.id !== action.payload.id);
    },
  },
})

export const { setUrls, urlAdded, urlUpdated, urlDeleted } = urlsSlice.actions;
export default urlsSlice.reducer;

export const selectUrls = (state) => state.urls;