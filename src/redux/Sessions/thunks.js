import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  ADD_SESSIONS_FETCHING,
  ADD_SESSIONS_FULFILLED,
  ADD_SESSIONS_REJECTED,
  DELETE_SESSIONS_FETCHING,
  DELETE_SESSIONS_FULFILLED,
  DELETE_SESSIONS_REJECTED,
  UPDATE_SESSIONS_FETCHING,
  UPDATE_SESSIONS_FULFILLED,
  UPDATE_SESSIONS_REJECTED,
  GET_ONE_SESSION_FETCHING,
  GET_ONE_SESSION_FULFILLED,
  GET_ONE_SESSION_REJECTED
} from 'constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/sessions`;

const getSessionsFetching = () => ({
  type: GET_SESSIONS_FETCHING
});

const getSessionsFulfilled = (payload) => ({
  type: GET_SESSIONS_FULFILLED,
  payload
});

const getSessionsRejected = () => ({
  type: GET_SESSIONS_REJECTED
});

export const getSessions = () => {
  return (dispatch) => {
    dispatch(getSessionsFetching());
    fetch(BASE_URL, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getSessionsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getSessionsRejected());
      });
  };
};

const addSessionsFetching = () => ({
  type: ADD_SESSIONS_FETCHING
});

const addSessionsFulfilled = (payload) => ({
  type: ADD_SESSIONS_FULFILLED,
  payload
});

const addSessionsRejected = () => ({
  type: ADD_SESSIONS_REJECTED
});

export const addSessions = (client) => (dispatch) => {
  dispatch(addSessionsFetching());
  return fetch(BASE_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      token: sessionStorage.getItem('token')
    },
    body: JSON.stringify(client)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(addSessionsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(addSessionsRejected());
    });
};

const deleteSessionsFetching = () => ({
  type: DELETE_SESSIONS_FETCHING
});

const deleteSessionsFulfilled = (payload) => ({
  type: DELETE_SESSIONS_FULFILLED,
  payload
});

const deleteSessionsRejected = () => ({
  type: DELETE_SESSIONS_REJECTED
});

export const deleteSessions = (id) => (dispatch) => {
  dispatch(deleteSessionsFetching());
  return fetch(
    `${BASE_URL}/${id}`,
    {
      headers: {
        token: sessionStorage.getItem('token')
      }
    },
    { method: 'DELETE' }
  )
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(deleteSessionsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(deleteSessionsRejected());
    });
};

const updateSessionsFetching = () => ({
  type: UPDATE_SESSIONS_FETCHING
});

const updateSessionsFullfiled = (payload, id) => ({
  type: UPDATE_SESSIONS_FULFILLED,
  payload,
  id
});

const updateSessionsRejected = () => ({
  type: UPDATE_SESSIONS_REJECTED
});

export const updateSessions = (sessions, id) => (dispatch) => {
  dispatch(updateSessionsFetching());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem('token') },
    body: JSON.stringify(sessions)
  })
    .then((data) => {
      if (data.status === 200 || data.status === 201) return data.json();
      throw new Error(`HTTP ${data.status}`);
    })
    .then(() => {
      dispatch(updateSessionsFullfiled(id));
    })
    .catch(() => {
      dispatch(updateSessionsRejected());
    });
};

const getOneSessionFetching = () => ({
  type: GET_ONE_SESSION_FETCHING
});

const getOneSessionFulfilled = (payload) => ({
  type: GET_ONE_SESSION_FULFILLED,
  payload
});

const getOneSessionRejected = () => ({
  type: GET_ONE_SESSION_REJECTED
});

export const getOneSession = (id) => {
  return (dispatch) => {
    dispatch(getOneSessionFetching());
    return fetch(`${BASE_URL}/${id}`, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getOneSessionFulfilled(response.data));
        return response.data;
      })
      .catch(() => {
        dispatch(getOneSessionRejected());
      });
  };
};
