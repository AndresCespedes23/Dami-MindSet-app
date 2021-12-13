import {
  GET_PSYCHOLOGIST_FETCHING,
  GET_PSYCHOLOGIST_FULFILLED,
  GET_PSYCHOLOGIST_REJECTED,
  GET_ONE_PSYCHOLOGIST_FETCHING,
  GET_ONE_PSYCHOLOGIST_FULFILLED,
  GET_ONE_PSYCHOLOGIST_REJECTED,
  DELETE_PSYCHOLOGIST_FETCHING,
  DELETE_PSYCHOLOGIST_FULFILLED,
  DELETE_PSYCHOLOGIST_REJECTED,
  UPDATE_PSYCHOLOGIST_FETCHING,
  UPDATE_PSYCHOLOGIST_FULFILLED,
  UPDATE_PSYCHOLOGIST_REJECTED,
  ADD_PSYCHOLOGIST_FETCHING,
  ADD_PSYCHOLOGIST_FULFILLED,
  ADD_PSYCHOLOGIST_REJECTED
} from '../../constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/psychologists`;

const getPsychologistFecth = () => ({
  type: GET_PSYCHOLOGIST_FETCHING
});

const getPsychologistFulfiliied = (payload) => ({
  type: GET_PSYCHOLOGIST_FULFILLED,
  payload
});

const getPsychologistRejected = () => ({
  type: GET_PSYCHOLOGIST_REJECTED
});

const getOnePsychologistFetching = () => ({
  type: GET_ONE_PSYCHOLOGIST_FETCHING
});

const getOnePsychologistFulfilled = (payload) => ({
  type: GET_ONE_PSYCHOLOGIST_FULFILLED,
  payload
});

const getOnePsychologistRejected = () => ({
  type: GET_ONE_PSYCHOLOGIST_REJECTED
});

const deletePsychologistFetching = () => ({
  type: DELETE_PSYCHOLOGIST_FETCHING
});

const deletePsychologistFulfilled = (payload) => ({
  type: DELETE_PSYCHOLOGIST_FULFILLED,
  payload
});

const deletePsychologistRejected = () => ({
  type: DELETE_PSYCHOLOGIST_REJECTED
});

const addPsychologistFetching = () => ({
  type: ADD_PSYCHOLOGIST_FETCHING
});

const addPsychologistFulfilled = (payload) => ({
  type: ADD_PSYCHOLOGIST_FULFILLED,
  payload
});

const addPsychologistRejected = () => ({
  type: ADD_PSYCHOLOGIST_REJECTED
});

const updatePsychologistFetching = () => ({
  type: UPDATE_PSYCHOLOGIST_FETCHING
});

const updatePsychologistFulfilled = (payload) => ({
  type: UPDATE_PSYCHOLOGIST_FULFILLED,
  payload
});

const updatePsychologistRejected = () => ({
  type: UPDATE_PSYCHOLOGIST_REJECTED
});

export const getPsychologists = () => {
  return (dispatch) => {
    dispatch(getPsychologistFecth());
    fetch(BASE_URL)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getPsychologistFulfiliied(response.data));
      })
      .catch(() => {
        dispatch(getPsychologistRejected());
      });
  };
};

export const getOnePsychologist = (id) => (dispatch) => {
  dispatch(getOnePsychologistFetching());
  return fetch(`${BASE_URL}/${id}`)
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(getOnePsychologistFulfilled(response.data));
      return response.data;
    })
    .catch(() => {
      dispatch(getOnePsychologistRejected());
    });
};

export const deletePsychologist = (id) => (dispatch) => {
  dispatch(deletePsychologistFetching());
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(deletePsychologistFulfilled(response.data));
    })
    .catch(() => {
      dispatch(deletePsychologistRejected());
    });
};

export const addPsychologist = (psychologist) => (dispatch) => {
  dispatch(addPsychologistFetching());
  return fetch(BASE_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(psychologist)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(addPsychologistFulfilled(response.data));
    })
    .catch(() => {
      dispatch(addPsychologistRejected());
    });
};

export const updatePsychologist = (psychologist, id) => (dispatch) => {
  dispatch(updatePsychologistFetching());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(psychologist)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(updatePsychologistFulfilled(response.data));
    })
    .catch(() => {
      dispatch(updatePsychologistRejected());
    });
};
