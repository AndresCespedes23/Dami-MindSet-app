import {
  MODAL_TYPE,
  SHOW_MODAL,
  SHOW_MESSAGE,
  CLEAN_ERROR,
  CLEAN_SELECTED_SESSION,
  CLEAN_AVAILABLE_SESSIONS
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

export const cleanSelectedSession = () => {
  return {
    type: CLEAN_SELECTED_SESSION
  };
};
export const cleanAvailableSessions = () => {
  return {
    type: CLEAN_AVAILABLE_SESSIONS
  };
};
