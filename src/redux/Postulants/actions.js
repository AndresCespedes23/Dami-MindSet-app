import {
  SHOW_MODAL,
  SHOW_MESSAGE,
  MODAL_TYPE,
  CLEAN_ERROR,
  CLEAN_SELECTED_POSTULANT
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

export const cleanSelectedPostulant = () => {
  return {
    type: CLEAN_SELECTED_POSTULANT
  };
};
