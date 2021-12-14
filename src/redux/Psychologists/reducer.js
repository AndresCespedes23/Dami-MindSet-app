import {
  GET_PSYCHOLOGIST_FETCHING,
  GET_PSYCHOLOGIST_FULFILLED,
  GET_PSYCHOLOGIST_REJECTED,
  DELETE_PSYCHOLOGIST_FETCHING,
  DELETE_PSYCHOLOGIST_FULFILLED,
  DELETE_PSYCHOLOGIST_REJECTED,
  UPDATE_PSYCHOLOGIST_FETCHING,
  UPDATE_PSYCHOLOGIST_FULFILLED,
  UPDATE_PSYCHOLOGIST_REJECTED,
  ADD_PSYCHOLOGIST_FETCHING,
  ADD_PSYCHOLOGIST_FULFILLED,
  ADD_PSYCHOLOGIST_REJECTED,
  GET_ONE_PSYCHOLOGIST_FETCHING,
  GET_ONE_PSYCHOLOGIST_FULFILLED,
  GET_ONE_PSYCHOLOGIST_REJECTED,
  SHOW_MODAL,
  SHOW_MESSAGE,
  MODAL_TYPE
} from '../../constants/actionTypes';

const initialState = {
  list: [],
  isLoading: false,
  isLoadingForm: false,
  psychologist: {},
  showModal: false,
  error: false,
  showMessage: false,
  messageType: '',
  messageText: ''
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
    case GET_ONE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isLoadingForm: true
      };
    case GET_ONE_PSYCHOLOGIST_FULFILLED: {
      return {
        ...state,
        isLoadingForm: false,
        psychologist: action.payload
      };
    }
    case GET_ONE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isLoadingForm: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get one Psychologist'
      };
    case DELETE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Deleted Psychologist',
        list: state.list.filter((psychologist) => psychologist.id !== action.payload)
      };
    case DELETE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot delete Psychologist'
      };
    case UPDATE_PSYCHOLOGIST_FETCHING:
      return {
        ...state
      };
    case UPDATE_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        messageType: 'success',
        messageText: 'Updated Psychologist',
        list: [...state.list, action.payload]
      };
    case UPDATE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        error: true,
        messageType: 'error',
        messageText: 'Cannot update Psychologist'
      };
    case ADD_PSYCHOLOGIST_FETCHING:
      return {
        ...state
      };
    case ADD_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Added Psychologist',
        list: [...state.list, action.payload]
      };
    case ADD_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot Add Psychologist'
      };
    case SHOW_MODAL: {
      return {
        ...state,
        showModal: action.showModal
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        showMessage: action.showMessage
      };
    }
    case MODAL_TYPE: {
      return {
        ...state,
        modalType: action.modalType
      };
    }
    default:
      return state;
  }
};

export default psychologistReducer;
