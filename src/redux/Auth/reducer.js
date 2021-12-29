import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  CLEAN_ERROR,
  SET_AUTHENTICATION,
  LOG_OUT_PENDING,
  LOG_OUT_FULFILLED,
  LOG_OUT_REJECTED,
  REGISTER_NEW_USER_FETCHING,
  REGISTER_NEW_USER_FULFILLED,
  REGISTER_NEW_USER_REJECTED
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  authenticated: false,
  error: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case LOGIN_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        authenticated: true
      };
    }
    case LOGIN_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CLEAN_ERROR: {
      return {
        ...state,
        error: initialState.error
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: true
      };
    }
    case LOG_OUT_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case LOG_OUT_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        authenticated: false
      };
    }
    case LOG_OUT_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case REGISTER_NEW_USER_FETCHING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case REGISTER_NEW_USER_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        authenticated: true
      };
    }
    case REGISTER_NEW_USER_REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
