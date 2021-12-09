import { SHOW_MODAL } from '../../constants/actionTypes';
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
