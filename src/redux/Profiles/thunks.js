import {
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  ADD_PROFILES_FETCHING,
  ADD_PROFILES_FULFILLED,
  ADD_PROFILES_REJECTED,
  DELETE_PROFILES_FETCHING,
  DELETE_PROFILES_FULFILLED,
  DELETE_PROFILES_REJECTED,
  UPDATE_PROFILES_FETCHING,
  UPDATE_PROFILES_FULFILLED,
  UPDATE_PROFILES_REJECTED,
  GET_ONE_PROFILE_FETCHING,
  GET_ONE_PROFILE_FULFILLED,
  GET_ONE_PROFILE_REJECTED
} from 'constants/actionTypes';

const URL = `${process.env.REACT_APP_API}/profiles`;

const getProfilesFetching = () => ({
  type: GET_PROFILES_FETCHING
});

const getProfilesFulfilled = (payload) => ({
  type: GET_PROFILES_FULFILLED,
  payload
});

const getProfilesRejected = () => ({
  type: GET_PROFILES_REJECTED
});

export const getProfiles = () => (dispatch) => {
  dispatch(getProfilesFetching());
  return fetch(URL, {
    headers: {
      token: sessionStorage.getItem('token')
    }
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(getProfilesFulfilled(response.data));
      return response.data;
    })
    .catch(() => {
      dispatch(getProfilesRejected());
    });
};

const addProfilesFetching = () => ({
  type: ADD_PROFILES_FETCHING
});

const addProfilesFullfiled = (payload) => ({
  type: ADD_PROFILES_FULFILLED,
  payload
});

const addProfilesRejected = () => ({
  type: ADD_PROFILES_REJECTED
});

export const addProfile = (profile) => (dispatch) => {
  dispatch(addProfilesFetching());
  return fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      token: sessionStorage.getItem('token')
    },
    body: JSON.stringify(profile)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(addProfilesFullfiled(response.data));
    })
    .catch(() => {
      dispatch(addProfilesRejected());
    });
};

const deleteProfilesFetching = () => ({
  type: DELETE_PROFILES_FETCHING
});

const deleteProfilesFulfilled = (payload) => ({
  type: DELETE_PROFILES_FULFILLED,
  payload
});

const deleteProfilesRejected = () => ({
  type: DELETE_PROFILES_REJECTED
});

export const deleteProfile = (id) => (dispatch) => {
  dispatch(deleteProfilesFetching());
  return fetch(
    `${URL}/${id}`,
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
    .then(() => {
      dispatch(deleteProfilesFulfilled(id));
    })
    .catch(() => {
      dispatch(deleteProfilesRejected());
    });
};

const updateProfilesFetching = () => ({
  type: UPDATE_PROFILES_FETCHING
});

const updateProfilesFullfiled = (payload) => ({
  type: UPDATE_PROFILES_FULFILLED,
  payload
});

const updateProfilesRejected = () => ({
  type: UPDATE_PROFILES_REJECTED
});

export const updateProfile = (profiles, id) => (dispatch) => {
  dispatch(updateProfilesFetching());
  return fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem('token') },
    body: JSON.stringify(profiles)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then(() => {
      dispatch(updateProfilesFullfiled(id));
    })
    .catch(() => {
      dispatch(updateProfilesRejected());
    });
};

const getProfileFetching = (id) => ({
  type: GET_ONE_PROFILE_FETCHING,
  id
});

const getProfileFullfiled = (payload) => ({
  type: GET_ONE_PROFILE_FULFILLED,
  payload
});

const getProfileRejected = () => ({
  type: GET_ONE_PROFILE_REJECTED
});

export const getOneProfile = (id) => {
  return (dispatch) => {
    dispatch(getProfileFetching());
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
        dispatch(getProfileFullfiled(response.data));
        return response.data;
      })
      .catch(() => {
        dispatch(getProfileRejected());
      });
  };
};
