import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  ADD_APPLICATIONS_FETCHING,
  ADD_APPLICATIONS_FULFILLED,
  ADD_APPLICATIONS_REJECTED
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

const URL = `${process.env.REACT_APP_API}/applications`;

export const getApplications = () => {
  return (dispatch) => {
    dispatch(getApplicationsFetching());
    fetch(URL)
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
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(application)
  })
    .then((data) => data.json())
    .then((response) => {
      dispatch(addApplicationFullfiled(response));
    })
    .catch(() => {
      dispatch(addApplicationRejected());
    });
};

// OLD APPLICATION ADD FUNCTION
// const handleAddApplication = (application) => {
//   fetch(`${process.env.REACT_APP_API}/applications`, {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(application)
//   })
//     .then((response) => {
//       if (response.status === 200 || response.status === 201) return response.json();
//       throw new Error(`HTTP ${response.status}`);
//     })
//     .then((response) => {
//       if (response.errors || response.code) {
//         setShowMessage(true);
//         setMessageType('error');
//         setMessage('Error with parameters');
//         return;
//       }
//       setShowMessage(true);
//       setMessageType('success');
//       setMessage('Application added');
//       getApplications();
//     })
//     .catch((err) => {
//       console.log(err);
//       setShowMessage(true);
//       setMessageType('error');
//       setMessage('Error creating application');
//     });
// };

// ----------------------------------------------------------------
// const deleteCharacterFetching = () => ({
//   type: DELETE_APPLICATIONS_FETCHING
// });

// const deleteCharacterFulfilled = (payload) => ({
//   type: DELETE_APPLICATIONS_FULFILLED,
//   payload
// });

// const deleteCharacterRejected = () => ({
//   type: DELETE_APPLICATIONS_REJECTED
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
