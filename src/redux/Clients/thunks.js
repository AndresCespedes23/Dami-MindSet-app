import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  ADD_CLIENTS_FETCHING,
  ADD_CLIENTS_FULFILLED,
  ADD_CLIENTS_REJECTED,
  DELETE_CLIENTS_FETCHING,
  DELETE_CLIENTS_FULFILLED,
  DELETE_CLIENTS_REJECTED
} from '../../constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/clients`;

const getClientsFetching = () => ({
  type: GET_CLIENTS_FETCHING
});

const getClientsFulfilled = (payload) => ({
  type: GET_CLIENTS_FULFILLED,
  payload
});

const getClientsRejected = () => ({
  type: GET_CLIENTS_REJECTED
});

export const getClients = () => {
  return (dispatch) => {
    dispatch(getClientsFetching());
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getClientsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getClientsRejected());
      });
  };
};

const addClientsFetching = () => ({
  type: ADD_CLIENTS_FETCHING
});

const addClientsFulfilled = (payload) => ({
  type: ADD_CLIENTS_FULFILLED,
  payload
});

const addClientsRejected = () => ({
  type: ADD_CLIENTS_REJECTED
});

export const addClient = () => {
  return (dispatch) => {
    dispatch(addClientsFetching());
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((response) => {
        dispatch(addClientsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(addClientsRejected());
      });
  };
};

const deleteClientsFetching = () => ({
  type: DELETE_CLIENTS_FETCHING
});

const deleteClientsFulfilled = (payload) => ({
  type: DELETE_CLIENTS_FULFILLED,
  payload
});

const deleteClientsRejected = () => ({
  type: DELETE_CLIENTS_REJECTED
});

export const deleteClient = (id) => {
  return (dispatch) => {
    dispatch(deleteClientsFetching());
    fetch(`${BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteClientsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(deleteClientsRejected());
      });
  };
};
