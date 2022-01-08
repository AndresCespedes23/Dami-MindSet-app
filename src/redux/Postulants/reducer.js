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
  SEARCH_POSTULANTS_FETCHING,
  SEARCH_POSTULANTS_FULFILLED,
  SEARCH_POSTULANTS_REJETED,
  SHOW_MODAL,
  SHOW_MESSAGE,
  MODAL_TYPE,
  CLEAN_ERROR,
  CLEAN_SELECTED_POSTULANT
} from 'constants/actionTypes';

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
        isLoading: true
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
        list: state.list.filter((postulant) => postulant.id !== action.payload)
      };
    case DELETE_POSTULANTS_REJETED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot delete Postulants'
      };
    case UPDATE_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Updated Postulant',
        list: state.list.map((postulant) => {
          if (postulant._id === action.payload.id) {
            return action.payload;
          }
          return postulant;
        })
      };
    case UPDATE_POSTULANTS_REJETED:
      return {
        ...state,
        isLoading: false,
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
    case CLEAN_ERROR: {
      return {
        ...state,
        error: initialState.error
      };
    }
    case CLEAN_SELECTED_POSTULANT: {
      return {
        ...state,
        postulant: initialState.postulant
      };
    }
    case SEARCH_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case SEARCH_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case SEARCH_POSTULANTS_REJETED:
    default:
      return state;
  }
};

export default postulantsReducer;
