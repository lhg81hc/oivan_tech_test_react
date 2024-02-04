'use client';

import { connect } from 'react-redux';
import {
  CreateEditUserModal,
  CreateEditUrlModal
} from "./";

const MODAL_COMPONENTS = {
  'CREATE_EDIT_URL': CreateEditUrlModal,
  'CREATE_EDIT_USER': CreateEditUserModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal {...modalProps} />;
};

export default connect(state => state.modal)(ModalRoot);
// CREDIT: https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions
