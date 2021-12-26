import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  CLEAN_ERROR,
  SET_AUTHENTICATION
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
        isFetching: true,
        error: initialState.error
      };
    }
    case LOGIN_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        authenticated: true
      };
    }
    case LOGIN_REJECTED: {
      return {
        ...state,
        isFetching: false,
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
    default: {
      return state;
    }
  }
};

export default authReducer;
