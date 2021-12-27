import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  ADD_CLIENTS_FETCHING,
  ADD_CLIENTS_FULFILLED,
  ADD_CLIENTS_REJECTED,
  DELETE_CLIENTS_FETCHING,
  DELETE_CLIENTS_FULFILLED,
  DELETE_CLIENTS_REJECTED,
  UPDATE_CLIENTS_FETCHING,
  UPDATE_CLIENTS_FULFILLED,
  UPDATE_CLIENTS_REJECTED,
  GET_ONE_CLIENTS_FETCHING,
  GET_ONE_CLIENTS_FULFILLED,
  GET_ONE_CLIENTS_REJECTED
} from 'constants/actionTypes';
import toast from 'react-hot-toast';

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
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
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

export const addClient = (client) => (dispatch) => {
  dispatch(addClientsFetching());
  return fetch(BASE_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(client)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(addClientsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(addClientsRejected());
    });
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

export const deleteClient = (id) => (dispatch) => {
  dispatch(deleteClientsFetching());
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(deleteClientsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(deleteClientsRejected());
    });
};

const updateClientsFetching = () => ({
  type: UPDATE_CLIENTS_FETCHING
});

const updateClientsFulfilled = (payload) => ({
  type: UPDATE_CLIENTS_FULFILLED,
  payload
});

const updateClientsRejected = () => ({
  type: UPDATE_CLIENTS_REJECTED
});

export const updateClient = (client, id) => (dispatch) => {
  dispatch(updateClientsFetching());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(client)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(updateClientsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(updateClientsRejected());
      toast.error('Error updating client', {
        duration: 3000
      });
    });
};

const getOneClientsFetching = () => ({
  type: GET_ONE_CLIENTS_FETCHING
});

const getOneClientsFulfilled = (payload) => ({
  type: GET_ONE_CLIENTS_FULFILLED,
  payload
});

const getOneClientsRejected = () => ({
  type: GET_ONE_CLIENTS_REJECTED
});

export const getOneClients = (id) => (dispatch) => {
  dispatch(getOneClientsFetching());
  return fetch(`${BASE_URL}/${id}`)
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(getOneClientsFulfilled(response.data));
      return response.data;
    })
    .catch(() => {
      dispatch(getOneClientsRejected());
    });
};
