import {
  SHOW_MESSAGE,
  SHOW_MODAL,
  MODAL_TYPE,
  CLEAN_ERROR,
  CLEAN_SELECTED_POSITION
} from 'constants/actionTypes';

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

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const cleanSelectedPositions = () => {
  return {
    type: CLEAN_SELECTED_POSITION
  };
};
