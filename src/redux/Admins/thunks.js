import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED
} from '../../constants/actionTypes';

const URL = `${process.env.REACT_APP_API}/admins`;

const getAdminsFetching = () => ({
  type: GET_ADMINS_FETCHING
});

const getAdminsFulfilled = (payload) => ({
  type: GET_ADMINS_FULFILLED,
  payload
});

const getAdminsRejected = () => ({
  type: GET_ADMINS_REJECTED
});

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsFetching());
    fetch(URL)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getAdminsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getAdminsRejected());
      });
  };
};
