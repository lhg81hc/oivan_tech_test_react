'use client';

import React from 'react';
import { connect } from 'react-redux';
import CreateEditUrlModal from "@/components/modal/CreateEditUrlModal";

const MODAL_COMPONENTS = {
  'CREATE_EDIT_URL': CreateEditUrlModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal {...modalProps} />;
};

export default connect(state => state.modal)(ModalRoot);
// CREDIT: https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions
