import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  CLEAN_ERROR,
  SET_AUTHENTICATION
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
