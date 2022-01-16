import {
  UPDATE_EDUCATION_FETCHING,
  UPDATE_EDUCATION_FULFILLED,
  UPDATE_EDUCATION_REJECTED
} from 'constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/candidates`;

const updateEducationFetching = () => ({ type: UPDATE_EDUCATION_FETCHING });

const updateEducationFulfilled = (payload, id) => ({
  type: UPDATE_EDUCATION_FULFILLED,
  payload,
  id
});

const updateEducationRejected = () => ({ type: UPDATE_EDUCATION_REJECTED });

export const updateEducation = (education, id) => (dispatch) => {
  dispatch(updateEducationFetching());
  return fetch(`${BASE_URL}/${id}/education/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      token: sessionStorage.getItem('token')
    },
    body: JSON.stringify(education)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then(() => {
      dispatch(updateEducationFulfilled(id));
    })
    .catch(() => {
      dispatch(updateEducationRejected());
    });
};
