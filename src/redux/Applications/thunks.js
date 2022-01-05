import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  ADD_APPLICATIONS_FETCHING,
  ADD_APPLICATIONS_FULFILLED,
  ADD_APPLICATIONS_REJECTED,
  DELETE_APPLICATIONS_FETCHING,
  DELETE_APPLICATIONS_FULFILLED,
  DELETE_APPLICATIONS_REJECTED,
  UPDATE_APPLICATIONS_FETCHING,
  UPDATE_APPLICATIONS_FULFILLED,
  UPDATE_APPLICATIONS_REJECTED,
  GET_ONE_APPLICATION_FETCHING,
  GET_ONE_APPLICATION_FULFILLED,
  GET_ONE_APPLICATION_REJECTED
} from 'constants/actionTypes';

const URL = `${process.env.REACT_APP_API}/applications`;

const getApplicationsFetching = () => ({
  type: GET_APPLICATIONS_FETCHING
});

const getApplicationsFulfilled = (payload) => ({
  type: GET_APPLICATIONS_FULFILLED,
  payload
});

const getApplicationsRejected = () => ({
  type: GET_APPLICATIONS_REJECTED
});

export const getApplications = () => {
  return (dispatch) => {
    dispatch(getApplicationsFetching());
    fetch(URL, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getApplicationsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getApplicationsRejected());
      });
  };
};

const addApplicationFetching = () => ({
  type: ADD_APPLICATIONS_FETCHING
});

const addApplicationFullfiled = (payload) => ({
  type: ADD_APPLICATIONS_FULFILLED,
  payload
});

const addApplicationRejected = () => ({
  type: ADD_APPLICATIONS_REJECTED
});

export const addApplication = (application) => (dispatch) => {
  dispatch(addApplicationFetching());
  return fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(application)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(addApplicationFullfiled(response.data));
    })
    .catch(() => {
      dispatch(addApplicationRejected());
    });
};

const deleteApplicationFetching = () => ({
  type: DELETE_APPLICATIONS_FETCHING
});

const deleteApplicationFulfilled = (payload) => ({
  type: DELETE_APPLICATIONS_FULFILLED,
  payload
});

const deleteApplicationRejected = () => ({
  type: DELETE_APPLICATIONS_REJECTED
});

export const deleteApplication = (id) => (dispatch) => {
  dispatch(deleteApplicationFetching());
  return fetch(`${URL}/${id}`, { method: 'DELETE' })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then(() => {
      dispatch(deleteApplicationFulfilled(id));
    })
    .catch(() => {
      dispatch(deleteApplicationRejected());
    });
};

const updateApplicationFetching = () => ({
  type: UPDATE_APPLICATIONS_FETCHING
});

const updateApplicationFullfiled = (payload) => ({
  type: UPDATE_APPLICATIONS_FULFILLED,
  payload
});

const updateApplicationRejected = () => ({
  type: UPDATE_APPLICATIONS_REJECTED
});

export const updateApplication = (applications, id) => (dispatch) => {
  dispatch(updateApplicationFetching());
  return fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applications)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then(() => {
      dispatch(updateApplicationFullfiled(id));
    })
    .catch(() => {
      dispatch(updateApplicationRejected());
    });
};

const getApplicationFetching = (id) => ({
  type: GET_ONE_APPLICATION_FETCHING,
  id
});

const getApplicationFullfiled = (payload) => ({
  type: GET_ONE_APPLICATION_FULFILLED,
  payload
});

const getApplicationRejected = () => ({
  type: GET_ONE_APPLICATION_REJECTED
});

export const getOneApplication = (id) => {
  return (dispatch) => {
    dispatch(getApplicationFetching());
    return fetch(`${URL}/${id}`, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getApplicationFullfiled(response.data));
        return response.data;
      })
      .catch(() => {
        dispatch(getApplicationRejected());
      });
  };
};
