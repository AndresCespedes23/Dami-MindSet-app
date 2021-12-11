import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  /* ADD_POSITIONS_FETCHING,
    ADD_POSITIONS_FULFILLED,
    ADD_POSITIONS_REJECTED, */
  DELETE_POSITIONS_FETCHING,
  DELETE_POSITIONS_FULFILLED,
  DELETE_POSITIONS_REJECTED
  /*UPDATE_POSITIONS_FETCHING,
    UPDATE_POSITIONS_FULFILLED,
    UPDATE_POSITIONS_REJECTED,
    GET_ONE_POSITION_FETCHING,
    GET_ONE_POSITION_FULFILLED,
    GET_ONE_POSITION_REJECTED */
} from '../../constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/positions`;

const getPositionsFetching = () => ({
  type: GET_POSITIONS_FETCHING
});

const getPositionsFulfilled = (payload) => ({
  type: GET_POSITIONS_FULFILLED,
  payload
});

const getPositionsRejected = () => ({
  type: GET_POSITIONS_REJECTED
});

export const getPositions = () => {
  return (dispatch) => {
    dispatch(getPositionsFetching());
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        dispatch(getPositionsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getPositionsRejected());
      });
  };
};

const deletePositionsFetching = () => ({
  type: DELETE_POSITIONS_FETCHING
});

const deletePositionsFulfilled = (payload) => ({
  type: DELETE_POSITIONS_FULFILLED,
  payload
});

const deletePositionsRejected = () => ({
  type: DELETE_POSITIONS_REJECTED
});

export const deletePositions = (id) => (dispatch) => {
  dispatch(deletePositionsFetching());
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then((response) => {
      dispatch(deletePositionsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(deletePositionsRejected());
    });
};
