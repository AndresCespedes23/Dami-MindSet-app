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
  UPDATE_SESSIONS_REJECTED
  /* GET_ONE_SESSION_FETCHING,
  GET_ONE_SESSION_FULFILLED,
  GET_ONE_SESSION_REJECTED */
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  session: null
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

    default:
      return state;
  }
};

export default sessionsReducer;
