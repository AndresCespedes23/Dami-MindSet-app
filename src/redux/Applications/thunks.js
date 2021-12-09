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
} from '../../constants/actionTypes';

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
  return fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(application)
  })
    .then((data) => data.json())
    .then((response) => {
      dispatch(addApplicationFullfiled(response.data));
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
    .then((data) => data.json())
    .then(() => {
      dispatch(deleteApplicationFulfilled(id));
    })
    .catch(() => {
      dispatch(deleteApplicationRejected());
    });
};

// OLD DELETE APPLICATION FUNCTION FUNCTION
// const handleDelete = (id) => {
//   fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8'
//     }
//   })
//     .then((response) => {
//       if (response.status === 200 || response.status === 201) return response.json();
//       throw new Error(`HTTP ${response.status}`);
//     })
//     .then(() => {
//       setShowMessage(true);
//       setMessageType('success');
//       setMessage('Application deleted');
//       getApplications();
//     })
//     .catch((err) => {
//       console.log(err);
//       setShowMessage(true);
//       setMessageType('error');
//       setMessage('Error deleting application');
//     });
// };

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
    .then((data) => data.json())
    .then(() => {
      dispatch(updateApplicationFullfiled(id));
    })
    .catch(() => {
      dispatch(updateApplicationRejected());
    });
};

// const handleUpdateApplication = (application) => {
//   fetch(`${process.env.REACT_APP_API}/applications/${idActive}`, {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8'
//     },
//     body: JSON.stringify(application)
//   })
//     .then((response) => {
//       if (response.status === 200 || response.status === 201) return response.json();
//       throw new Error(`HTTP ${response.status}`);
//     })
//     .then(() => {
//       setShowMessage(true);
//       setMessageType('success');
//       setMessage('Application updated');
//       getApplications();
//     })
//     .catch((err) => {
//       console.log(err);
//       setShowMessage(true);
//       setMessageType('error');
//       setMessage('Error updating application');
//     });
// };

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

export const getOneApplication = (id) => (dispatch) => {
  dispatch(getApplicationFetching());
  fetch(`${process.env.REACT_APP_API}/applications/${id}`)
    .then((response) => {
      if (response.status === 200 || response.status === 201) return response.json();
      throw new Error(`HTTP ${response.status}`);
    })
    .then((response) => {
      response.data.dateTime = response.data.dateTime.split('T')[0];

      dispatch(getApplicationFullfiled(response.data));
      response.data;
    })
    .catch(() => {
      dispatch(getApplicationRejected());
    });
};
