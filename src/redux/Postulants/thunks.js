import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJETED,
  ADD_POSTULANTS_FETCHING,
  ADD_POSTULANTS_FULFILLED,
  ADD_POSTULANTS_REJETED,
  DELETE_POSTULANTS_FETCHING,
  DELETE_POSTULANTS_FULFILLED,
  DELETE_POSTULANTS_REJETED
  //UPDATE_POSTULANTS_FETCHING,
  //UPDATE_POSTULANTS_FULFILLED,
  //UPDATE_POSTULANTS_REJETED,
  //GET_ONE_POSTULANTS_FETCHING,
  //GET_ONE_POSTULANTS_FULFILLED,
  //GET_ONE_POSTULANTS_REJETED,
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

export const addPostulants = () => {
  return (dispatch) => {
    dispatch(addPostulantsFetching());
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((response) => {
        dispatch(addPostulantsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(addPostulantsRejected());
      });
  };
};

const deletePostulantsFetching = () => ({ type: DELETE_POSTULANTS_FETCHING });

const deletePostulantsFulfilled = (payload) => ({ type: DELETE_POSTULANTS_FULFILLED, payload });

const deletePostulantsRejected = () => ({ type: DELETE_POSTULANTS_REJETED });

export const deletePostulants = (id) => {
  return (dispatch) => {
    dispatch(deletePostulantsFetching());
    fetch(`${BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(deletePostulantsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(deletePostulantsRejected());
      });
  };
};
