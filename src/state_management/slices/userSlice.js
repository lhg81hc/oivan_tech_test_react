'use client'

import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_state, action) {
      return action.payload
    },
    userAdded(state, action) {
      return [action.payload, ...state]
    },
    userUpdated(state, action) {
      return state.map((u)=> {
        if( u.id === action.payload.id ) {
          return action.payload
        } else {
          return u;
        }
      });
    },
    userDeleted(state, action) {
      return state.filter(u => u.id !== action.payload.id);
    },
  },
})

export const { setUsers, userAdded, userUpdated, userDeleted } = usersSlice.actions;
export default usersSlice.reducer;

export const selectUsers = (state) => state.users;