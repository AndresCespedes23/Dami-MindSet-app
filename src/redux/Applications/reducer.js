import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  ADD_APPLICATIONS_FETCHING,
  ADD_APPLICATIONS_FULFILLED,
  ADD_APPLICATIONS_REJECTED,
  DELETE_APPLICATIONS_FETCHING,
  DELETE_APPLICATIONS_FULFILLED,
  DELETE_APPLICATIONS_REJECTED,
  UPDATE_APPLICATIONS_FETCHING,
  UPDATE_APPLICATIONS_FULFILLED,
  UPDATE_APPLICATIONS_REJECTED,
  GET_ONE_APPLICATION_FETCHING,
  GET_ONE_APPLICATION_FULFILLED,
  GET_ONE_APPLICATION_REJECTED,
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
  application: null,
  showModal: false,
  showMessage: false
};

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get applications'
      };
    case ADD_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Application successfully added',
        list: [...state.list, action.payload]
      };
    case ADD_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Error adding application'
      };
    case DELETE_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Application deleted successfully',
        list: state.list.filter((application) => application.id !== action.payload)
      };
    case DELETE_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Error deleting application'
      };
    case UPDATE_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((application) => {
          if (application._id === action.payload.id) {
            return action.payload;
          }
          return application;
        }),
        messageType: 'success',
        messageText: 'Application updated successfully'
      };
    case UPDATE_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Error updating application'
      };
    case GET_ONE_APPLICATION_FETCHING:
      return {
        ...state,
        isLoadingForm: true
      };
    case GET_ONE_APPLICATION_FULFILLED:
      return {
        ...state,
        isLoadingForm: false,
        application: action.payload
      };
    case GET_ONE_APPLICATION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Error getting application'
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

export default applicationsReducer;
