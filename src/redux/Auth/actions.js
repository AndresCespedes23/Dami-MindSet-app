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

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_FULFILLED,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_REJECTED,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const setAuthentication = () => {
  return {
    type: SET_AUTHENTICATION
  };
};

export const logoutPending = () => {
  return {
    type: LOG_OUT_PENDING
  };
};

export const logoutSuccess = () => {
  return {
    type: LOG_OUT_FULFILLED
  };
};

export const logoutError = (error) => {
  return {
    type: LOG_OUT_REJECTED,
    payload: error
  };
};

export const registerNewUserFetching = () => {
  return {
    type: REGISTER_NEW_USER_FETCHING
  };
};

export const registerNewUserFulfilled = (data) => {
  return {
    type: REGISTER_NEW_USER_FULFILLED,
    payload: data
  };
};

export const registerNewUserRejected = (error) => {
  return {
    type: REGISTER_NEW_USER_REJECTED,
    payload: error
  };
};
