import { MODAL_TITLE, MODAL_TYPE, SHOW_MODAL } from '../../constants/actionTypes';
import { SHOW_MESSAGE } from '../../constants/actionTypes';

export const setShowModal = (showModal) => {
  return {
    type: SHOW_MODAL,
    showModal
  };
};

export const setShowMessage = (showMessage) => {
  return {
    type: SHOW_MESSAGE,
    showMessage
  };
};

export const setModalType = (modalType) => {
  return {
    type: MODAL_TYPE,
    modalType
  };
};

export const setModalTitle = (modalTitle) => {
  return {
    type: MODAL_TITLE,
    modalTitle
  };
};
