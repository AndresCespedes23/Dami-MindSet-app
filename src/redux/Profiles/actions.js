import {
  MODAL_TYPE,
  SHOW_MODAL,
  SHOW_MESSAGE,
  CLEAN_SELECTED_PROFILE
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

export const cleanSelectedProfiles = () => {
  return {
    type: CLEAN_SELECTED_PROFILE
  };
};
