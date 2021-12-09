import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED
  /*   ADD_SESSIONS_FETCHING,
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
  GET_ONE_SESSION_REJECTED */
} from '../../constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/sessions`;

const getSessionsFetching = () => ({
  type: GET_SESSIONS_FETCHING
});

const getSessionsFulfilled = (payload) => ({
  type: GET_SESSIONS_FULFILLED,
  payload
});

const getSessionsRejected = () => ({
  type: GET_SESSIONS_REJECTED
});

export const getSessions = () => {
  return (dispatch) => {
    dispatch(getSessionsFetching());
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        dispatch(getSessionsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getSessionsRejected());
      });
  };
};
