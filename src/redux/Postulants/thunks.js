import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJETED,
  ADD_POSTULANTS_FETCHING,
  ADD_POSTULANTS_FULFILLED,
  ADD_POSTULANTS_REJETED,
  UPDATE_POSTULANTS_FETCHING,
  UPDATE_POSTULANTS_FULFILLED,
  UPDATE_POSTULANTS_REJETED,
  GET_ONE_POSTULANTS_FETCHING,
  GET_ONE_POSTULANTS_FULFILLED,
  GET_ONE_POSTULANTS_REJETED,
  DELETE_POSTULANTS_FETCHING,
  DELETE_POSTULANTS_FULFILLED,
  DELETE_POSTULANTS_REJETED
} from '../../constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/candidates`;

const getPostulantsFetching = () => ({ type: GET_POSTULANTS_FETCHING });

const getPostulantsFulfilled = (payload) => ({ type: GET_POSTULANTS_FULFILLED, payload });

const getPostulantsRejected = () => ({ type: GET_POSTULANTS_REJETED });

export const getPostulants = () => {
  return (dispatch) => {
    dispatch(getPostulantsFetching());
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getPostulantsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getPostulantsRejected());
      });
  };
};

const addPostulantsFetching = () => ({ type: ADD_POSTULANTS_FETCHING });

const addPostulantsFulfilled = (payload) => ({ type: ADD_POSTULANTS_FULFILLED, payload });

const addPostulantsRejected = () => ({ type: ADD_POSTULANTS_REJETED });

export const addPostulant = (postulant) => (dispatch) => {
  dispatch(addPostulantsFetching());
  return fetch(BASE_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(postulant)
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch(addPostulantsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(addPostulantsRejected());
    });
};

const deletePostulantsFetching = () => ({ type: DELETE_POSTULANTS_FETCHING });

const deletePostulantsFulfilled = (payload) => ({ type: DELETE_POSTULANTS_FULFILLED, payload });

const deletePostulantsRejected = () => ({ type: DELETE_POSTULANTS_REJETED });

export const deletePostulant = (id) => (dispatch) => {
  dispatch(deletePostulantsFetching());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch(deletePostulantsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(deletePostulantsRejected());
    });
};

const updatePostulantsFetching = () => ({ type: UPDATE_POSTULANTS_FETCHING });

const updatePostulantsFulfilled = (payload) => ({
  type: UPDATE_POSTULANTS_FULFILLED,
  payload
});

const updatePostulantsRejected = () => ({ type: UPDATE_POSTULANTS_REJETED });

export const updatePostulant = (id, postulant) => (dispatch) => {
  dispatch(updatePostulantsFetching());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(postulant)
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch(updatePostulantsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(updatePostulantsRejected());
    });
};

const getOnePostulantsFetching = () => ({ type: GET_ONE_POSTULANTS_FETCHING });

const getOnePostulantsFulfilled = (payload) => ({
  type: GET_ONE_POSTULANTS_FULFILLED,
  payload
});

const getOnePostulantsRejected = () => ({
  type: GET_ONE_POSTULANTS_REJETED
});

export const getOnePostulant = (id) => (dispatch) => {
  dispatch(getOnePostulantsFetching());
  return fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((response) => {
      console.log('get one is working, 2do then');
      dispatch(getOnePostulantsFulfilled(response.data));
    })
    .catch(() => {
      console.log('get one catch');
      dispatch(getOnePostulantsRejected());
    });
};
