import {
  GET_PSYCHOLOGIST_FETCHING,
  GET_PSYCHOLOGIST_FULFILLED,
  GET_PSYCHOLOGIST_REJECTED
} from '../../constants/actionTypes';

const initialState = {
  list: [],
  isLoadingForm: false,
  psychologists: null,
  showModal: false,
  modalType: '',
  idActive: '',
  showMessage: false,
  messageType: '',
  message: '',
  isLoading: false
};

const psychologistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get Psychologists'
      };
    default:
      return state;
  }
};

export default psychologistReducer;
