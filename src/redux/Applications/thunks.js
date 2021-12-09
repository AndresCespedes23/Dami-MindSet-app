import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED
  //   ADD_APPLICATIONS_FETCHING,
  //   ADD_APPLICATIONS_FULFILLED,
  //   ADD_APPLICATIONS_REJECTED,
  //   DELETE_APPLICATIONS_FETCHING,
  //   DELETE_APPLICATIONS_FULFILLED,
  //   DELETE_APPLICATIONS_REJECTED
} from '../../constants/actionTypes';

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
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((data) => data.json())
      .then((response) => {
        dispatch(getApplicationsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getApplicationsRejected());
      });
  };
};

// fetch(`${process.env.REACT_APP_API}/applications`)
//       .then((response) => {
//         if (response.status === 200 || response.status === 201) return response.json();
//         throw new Error(`HTTP ${response.status}`);
//       })
//       .then((response) => {
//         setApplications(response.data);
//       })
//       .catch((err) => {
//         setMessageType('error');
//         setMessage('Error:', err);
//       })
//       .finally(() => setLoading(false));

// const addCharacterFetching = () => ({
//   type: ADD_CHARACTERS_FETCHING
// });

// const addCharacterFullfiled = (payload) => ({
//   type: ADD_CHARACTERS_FULFILLED,
//   payload
// });

// const addCharacterRejected = () => ({
//   type: ADD_CHARACTERS_REJECTED
// });

// export const addCharacter = (character) => (dispatch) => {
//   dispatch(addCharacterFetching());
//   fetch(URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(character)
//   })
//     .then((data) => data.json())
//     .then((response) => {
//       dispatch(addCharacterFullfiled(response));
//     })
//     .catch(() => {
//       dispatch(addCharacterRejected());
//     });
// };

// const deleteCharacterFetching = () => ({
//   type: DELETE_CHARACTERS_FETCHING
// });

// const deleteCharacterFulfilled = (payload) => ({
//   type: DELETE_CHARACTERS_FULFILLED,
//   payload
// });

// const deleteCharacterRejected = () => ({
//   type: DELETE_CHARACTERS_REJECTED
// });

// export const deleteCharacter = (id) => (dispatch) => {
//   dispatch(deleteCharacterFetching());
//   return fetch(`${URL}/${id}`, { method: 'DELETE' })
//     .then((data) => data.json())
//     .then(() => {
//       dispatch(deleteCharacterFulfilled(id));
//     })
//     .catch(() => {
//       dispatch(deleteCharacterRejected());
//     });
// };
