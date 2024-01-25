import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: null,
  modalProps: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action) {
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    hideModal(_state, _action) {
      return initialState
    }
  }
})

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;