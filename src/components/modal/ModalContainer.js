'use client';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import { hideModal } from "@/state_management/slices/modalSlice";
import ReactModal from 'react-modal';

const STYLES = {
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    maxHeight: '90vh',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
}

// PLEASE READ THE DOCUMENT http://reactcommunity.org/react-modal/ AND TRY NOT TO EDIT THIS WRAPPER.
// If your modal has different styling or different buttons or different behavior, just wrap the <ReactModal> inside your modal
export const ModalContainer = ({ modalType, dispatch, title, children, dismissible = true, reactModalProps = {} }) => {
  useEffect(() => {
    // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
    if (typeof window !== 'undefined') ReactModal.setAppElement('body');
  }, []);

  function modalHeader() {
    if (title || dismissible) {
      return (
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
          {dismissible && (
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => dispatch(hideModal())}
            >
              <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          )}
          <hr />
        </div>
      );
    }
  }

  return (
    <ReactModal
      isOpen={!!modalType}
      onRequestClose={() => dispatch(hideModal())}
      style={STYLES}
      className="bg-white rounded-lg shadow relative p-4 w-full max-w-2xl max-h-full"
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      ariaHideApp={false}
      {...reactModalProps}
    >
      {modalHeader()}
      {children}
    </ReactModal>
  );
};

connect(state => state.modal)(ModalContainer);
