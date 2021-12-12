import {
  GET_PSYCHOLOGIST_FETCHING,
  GET_PSYCHOLOGIST_FULFILLED,
  GET_PSYCHOLOGIST_REJECTED
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

export const getPsychologists = () => {
  return (dispatch) => {
    dispatch(getPsychologistFecth());
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getPsychologistFulfiliied(response.data));
      })
      .catch(() => {
        dispatch(getPsychologistRejected());
      });
  };
};
