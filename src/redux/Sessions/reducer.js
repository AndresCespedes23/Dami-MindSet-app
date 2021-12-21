import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  ADD_SESSIONS_FETCHING,
  ADD_SESSIONS_FULFILLED,
  ADD_SESSIONS_REJECTED,
  DELETE_SESSIONS_FETCHING,
  DELETE_SESSIONS_FULFILLED,
  DELETE_SESSIONS_REJECTED,
  UPDATE_SESSIONS_FETCHING,
  UPDATE_SESSIONS_FULFILLED,
  UPDATE_SESSIONS_REJECTED,
  GET_ONE_SESSION_FETCHING,
  GET_ONE_SESSION_FULFILLED,
  GET_ONE_SESSION_REJECTED,
  SHOW_MODAL,
  SHOW_MESSAGE,
  MODAL_TYPE,
  CLEAN_ERROR,
  CLEAN_SELECTED_SESSION
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  isLoadingForm: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  session: {},
  showModal: false,
  showMessage: false
};

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SESSIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_SESSIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get sessions'
      };
    case ADD_SESSIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_SESSIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Added Session',
        list: [...state.list, action.payload]
      };
    case ADD_SESSIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot add sessions'
      };
    case DELETE_SESSIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SESSIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Session deleted',
        list: state.list.filter((session) => session.id !== action.payload)
      };
    case DELETE_SESSIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot delete sessions'
      };
    case UPDATE_SESSIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_SESSIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Updated Client',
        list: state.list.map((session) => {
          if (session._id === action.payload.id) {
            return action.payload;
          }
          return session;
        })
      };
    case UPDATE_SESSIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot update sessions'
      };
    case GET_ONE_SESSION_FETCHING:
      return {
        ...state,
        isLoadingForm: true
      };
    case GET_ONE_SESSION_FULFILLED:
      return {
        ...state,
        isLoadingForm: false,
        session: action.payload
      };
    case GET_ONE_SESSION_REJECTED:
      return {
        ...state,
        isLoadingForm: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get session'
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
    case CLEAN_SELECTED_SESSION: {
      return {
        ...state,
        session: initialState.session
      };
    }
    default:
      return state;
  }
};

export default sessionsReducer;
