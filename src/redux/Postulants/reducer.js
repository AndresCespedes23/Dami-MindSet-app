import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJETED,
  ADD_POSTULANTS_FETCHING,
  ADD_POSTULANTS_FULFILLED,
  ADD_POSTULANTS_REJETED,
  DELETE_POSTULANTS_FETCHING,
  DELETE_POSTULANTS_FULFILLED,
  DELETE_POSTULANTS_REJETED,
  UPDATE_POSTULANTS_FETCHING,
  UPDATE_POSTULANTS_FULFILLED,
  UPDATE_POSTULANTS_REJETED,
  GET_ONE_POSTULANTS_FETCHING,
  GET_ONE_POSTULANTS_FULFILLED,
  GET_ONE_POSTULANTS_REJETED,
  SHOW_MODAL,
  SHOW_MESSAGE,
  MODAL_TYPE
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  isLoadingForm: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  postulant: {},
  showModal: false,
  showMessage: false
};

const postulantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_POSTULANTS_REJETED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get Postulants'
      };
    case ADD_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true // juli distinto Valen
      };
    case ADD_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Added Postulant',
        list: [...state.list, action.payload]
      };
    case ADD_POSTULANTS_REJETED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot Add Postulant'
      };
    case DELETE_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Deleted Postulant',
        list: [...state.list, action.payload]
      };
    case DELETE_POSTULANTS_REJETED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot delete Clients'
      };
    case UPDATE_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true // juli distinto Valen
      };
    case UPDATE_POSTULANTS_FULFILLED:
      return {
        ...state,
        messageType: 'success',
        messageText: 'Updated Postulant',
        list: [...state.list, action.payload]
      };
    case UPDATE_POSTULANTS_REJETED:
      return {
        ...state,
        error: true,
        messageType: 'error',
        messageText: 'Cannot update Postulant'
      };
    case GET_ONE_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoadingForm: true
      };
    case GET_ONE_POSTULANTS_FULFILLED: {
      return {
        ...state,
        isLoadingForm: false,
        postulant: action.payload
      };
    }
    case GET_ONE_POSTULANTS_REJETED:
      return {
        ...state,
        isLoadingForm: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get Postulant'
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

export default postulantsReducer;
