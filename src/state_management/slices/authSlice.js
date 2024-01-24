'use client'

import { createSlice } from "@reduxjs/toolkit";
import Cookie from 'js-cookie';

const initialState = {
  user: null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(_state, action) {
      Cookie.set('accessToken', action.payload.token);
      return action.payload
    },
    logOut: (state, _action) => {
      state.user = null;
      state.token = null;
    }
  },
})

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
