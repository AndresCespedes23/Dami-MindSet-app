import {
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  ADD_INTERVIEW_FETCHING,
  ADD_INTERVIEW_FULFILLED,
  ADD_INTERVIEW_REJECTED,
  DELETE_INTERVIEW_FETCHING,
  DELETE_INTERVIEW_FULFILLED,
  DELETE_INTERVIEW_REJECTED,
  UPDATE_INTERVIEW_FETCHING,
  UPDATE_INTERVIEW_FULFILLED,
  UPDATE_INTERVIEW_REJECTED,
  GET_ONE_INTERVIEW_FETCHING,
  GET_ONE_INTERVIEW_FULFILLED,
  GET_ONE_INTERVIEW_REJECTED
} from '../../constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/interviews`;

const getInterviewsFetching = () => ({
  type: GET_INTERVIEWS_FETCHING
});

const getInterviewsFulfilled = (payload) => ({
  type: GET_INTERVIEWS_FULFILLED,
  payload
});

const getInterviewsRejected = () => ({
  type: GET_INTERVIEWS_REJECTED
});

export const getInterviews = () => {
  return (dispatch) => {
    dispatch(getInterviewsFetching());
    fetch(BASE_URL)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getInterviewsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getInterviewsRejected());
      });
  };
};

const addInterviewFetching = () => ({
  type: ADD_INTERVIEW_FETCHING
});

const addInterviewFulfilled = (payload) => ({
  type: ADD_INTERVIEW_FULFILLED,
  payload
});

const addInterviewRejected = () => ({
  type: ADD_INTERVIEW_REJECTED
});

export const addInterview = (interview) => (dispatch) => {
  dispatch(addInterviewFetching());
  return fetch(BASE_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(interview)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(addInterviewFulfilled(response.data));
    })
    .catch(() => {
      dispatch(addInterviewRejected());
    });
};

const deleteInterviewFetching = () => ({
  type: DELETE_INTERVIEW_FETCHING
});

const deleteInterviewFulfilled = (payload) => ({
  type: DELETE_INTERVIEW_FULFILLED,
  payload
});

const deleteInterviewRejected = () => ({
  type: DELETE_INTERVIEW_REJECTED
});

export const deleteInterview = (id) => (dispatch) => {
  dispatch(deleteInterviewFetching());
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(deleteInterviewFulfilled(response.data));
    })
    .catch(() => {
      dispatch(deleteInterviewRejected());
    });
};

const updateInterviewFetching = () => ({
  type: UPDATE_INTERVIEW_FETCHING
});

const updateInterviewFullfiled = (payload, id) => ({
  type: UPDATE_INTERVIEW_FULFILLED,
  payload,
  id
});

const updateInterviewRejected = () => ({
  type: UPDATE_INTERVIEW_REJECTED
});

export const updateInterview = (interviews, id) => (dispatch) => {
  dispatch(updateInterviewFetching());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(interviews)
  })
    .then((data) => {
      if (data.status === 200 || data.status === 201) return data.json();
      throw new Error(`HTTP ${data.status}`);
    })
    .then(() => {
      dispatch(updateInterviewFullfiled(id));
    })
    .catch(() => {
      dispatch(updateInterviewRejected());
    });
};

const getOneInterviewFetching = () => ({
  type: GET_ONE_INTERVIEW_FETCHING
});

const getOneInterviewFulfilled = (payload) => ({
  type: GET_ONE_INTERVIEW_FULFILLED,
  payload
});

const getOneInterviewRejected = () => ({
  type: GET_ONE_INTERVIEW_REJECTED
});

export const getOneInterview = (id) => {
  return (dispatch) => {
    dispatch(getOneInterviewFetching());
    return fetch(`${BASE_URL}/${id}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getOneInterviewFulfilled(response.data));
        return response.data;
      })
      .catch(() => {
        dispatch(getOneInterviewRejected());
      });
  };
};
