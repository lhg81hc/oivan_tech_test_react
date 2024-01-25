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
    setCredentials(state, action) {
      const { user, token } = action.payload;

      Cookie.set('accessToken', token);
      state.user = user;
      state.token = token;
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
