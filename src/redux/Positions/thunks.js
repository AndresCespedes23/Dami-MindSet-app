import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  ADD_POSITIONS_FETCHING,
  ADD_POSITIONS_FULFILLED,
  ADD_POSITIONS_REJECTED,
  DELETE_POSITIONS_FETCHING,
  DELETE_POSITIONS_FULFILLED,
  DELETE_POSITIONS_REJECTED,
  UPDATE_POSITIONS_FETCHING,
  UPDATE_POSITIONS_FULFILLED,
  UPDATE_POSITIONS_REJECTED,
  GET_ONE_POSITION_FETCHING,
  GET_ONE_POSITION_FULFILLED,
  GET_ONE_POSITION_REJECTED
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
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        console.log(response);
        dispatch(getPositionsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getPositionsRejected());
      });
  };
};

const addPositionsFetching = () => ({
  type: ADD_POSITIONS_FETCHING
});

const addPositionsFulfilled = (payload) => ({
  type: ADD_POSITIONS_FULFILLED,
  payload
});

const addPositionsRejected = () => ({
  type: ADD_POSITIONS_REJECTED
});

export const addPositions = (position) => (dispatch) => {
  dispatch(addPositionsFetching());
  return fetch(BASE_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(position)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(addPositionsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(addPositionsRejected());
    });
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
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(deletePositionsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(deletePositionsRejected());
    });
};

const updatePositionsFetching = () => ({
  type: UPDATE_POSITIONS_FETCHING
});

const updatePositionsFullfiled = (payload, id) => ({
  type: UPDATE_POSITIONS_FULFILLED,
  payload,
  id
});

const updatePositionsRejected = () => ({
  type: UPDATE_POSITIONS_REJECTED
});

export const updatePositions = (positions, id) => (dispatch) => {
  dispatch(updatePositionsFetching());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(positions)
  })
    .then((data) => {
      if (data.status === 200 || data.status === 201) return data.json();
      throw new Error(`HTTP ${data.status}`);
    })
    .then(() => {
      dispatch(updatePositionsFullfiled(id));
    })
    .catch(() => {
      dispatch(updatePositionsRejected());
    });
};

const getOnePositionFetching = () => ({
  type: GET_ONE_POSITION_FETCHING
});

const getOnePositionFulfilled = (payload) => ({
  type: GET_ONE_POSITION_FULFILLED,
  payload
});

const getOnePositionRejected = () => ({
  type: GET_ONE_POSITION_REJECTED
});

export const getOnePosition = (id) => {
  return (dispatch) => {
    dispatch(getOnePositionFetching());
    return fetch(`${BASE_URL}/${id}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getOnePositionFulfilled(response.data));
        return response.data;
      })
      .catch(() => {
        dispatch(getOnePositionRejected());
      });
  };
};
