import {
  REGISTER_NEW_POSTULANT_ACCOUNT_FETCHING,
  REGISTER_NEW_POSTULANT_ACCOUNT_FULFILLED,
  REGISTER_NEW_POSTULANT_ACCOUNT_REJECTED
} from 'constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/candidates`;

const registerPostulantsFetching = () => ({ type: REGISTER_NEW_POSTULANT_ACCOUNT_FETCHING });

const registerPostulantsFulfilled = (payload) => ({
  type: REGISTER_NEW_POSTULANT_ACCOUNT_FULFILLED,
  payload
});

const registerPostulantsRejected = () => ({ type: REGISTER_NEW_POSTULANT_ACCOUNT_REJECTED });

export const registerPostulant = (postulant, id) => (dispatch) => {
  dispatch(registerPostulantsFetching());
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      token: sessionStorage.getItem('token')
    },
    body: JSON.stringify(postulant)
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      dispatch(registerPostulantsFulfilled(response.data));
    })
    .catch(() => {
      dispatch(registerPostulantsRejected());
    });
};
