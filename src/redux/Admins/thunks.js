import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  UPDATE_ADMINS_FETCHING,
  UPDATE_ADMINS_FULFILLED,
  UPDATE_ADMINS_REJECTED,
  GET_ONE_ADMIN_FETCHING,
  GET_ONE_ADMIN_FULFILLED,
  GET_ONE_ADMIN_REJECTED
} from 'constants/actionTypes';
import toast from 'react-hot-toast';

const BASE_URL = `${process.env.REACT_APP_API}/admins`;

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
    fetch(BASE_URL)
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

const updateAdminsFetching = () => ({
  type: UPDATE_ADMINS_FETCHING
});

const updateAdminsFullfiled = (payload, id) => ({
  type: UPDATE_ADMINS_FULFILLED,
  payload,
  id
});

const updateAdminsRejected = () => ({
  type: UPDATE_ADMINS_REJECTED
});

export const updateAdmins = (admins, id) => (dispatch) => {
  dispatch(updateAdminsFetching());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(admins)
  })
    .then((data) => {
      if (data.status === 200 || data.status === 201) return data.json();
      throw new Error(`HTTP ${data.status}`);
    })
    .then(() => {
      dispatch(updateAdminsFullfiled(id));
      toast.success('Admin updated successfully', {
        duration: 3000,
        style: {
          background: '#00b894'
        }
      });
    })
    .catch(() => {
      dispatch(updateAdminsRejected());
    });
};

const getOneAdminFetching = () => ({
  type: GET_ONE_ADMIN_FETCHING
});

const getOneAdminFulfilled = (payload) => ({
  type: GET_ONE_ADMIN_FULFILLED,
  payload
});

const getOneAdminRejected = () => ({
  type: GET_ONE_ADMIN_REJECTED
});

export const getOneAdmin = (id) => {
  return (dispatch) => {
    dispatch(getOneAdminFetching());
    return fetch(`${BASE_URL}/${id}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getOneAdminFulfilled(response.data));
        return response.data;
      })
      .catch(() => {
        dispatch(getOneAdminRejected());
      });
  };
};
