import {
  loginPending,
  loginSuccess,
  loginError,
  logoutPending,
  logoutSuccess,
  logoutError,
  registerNewUserFetching,
  registerNewUserFulfilled,
  registerNewUserRejected
} from './actions';
import {
  GET_LOGGED_USER_FETCHING,
  GET_LOGGED_USER_FULFILLED,
  GET_LOGGED_USER_REJECTED
} from 'constants/actionTypes';
import firebase from 'helpers/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const tokenResult = await response.user.getIdTokenResult();
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userType', tokenResult.claims.userType);
        sessionStorage.setItem('id', tokenResult.claims.id);
        return dispatch(loginSuccess());
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutPending());
    return firebase
      .auth()
      .signOut()
      .then(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userType');
        sessionStorage.removeItem('id');
        return dispatch(logoutSuccess());
      })
      .catch((error) => {
        return dispatch(logoutError(error.toString()));
      });
  };
};

export const registerNewUser = (credentials, userType) => {
  credentials.userType = userType;
  return (dispatch) => {
    dispatch(registerNewUserFetching());
    return fetch(`${process.env.REACT_APP_API}/auth/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(registerNewUserFulfilled(response.data));
      })
      .catch(() => {
        dispatch(registerNewUserRejected());
      });
  };
};

const getLoggedUserFetching = () => ({
  type: GET_LOGGED_USER_FETCHING
});

const getLoggedUserFulfilled = (payload) => ({
  type: GET_LOGGED_USER_FULFILLED,
  payload
});

const getLoggedUserRejected = () => ({
  type: GET_LOGGED_USER_REJECTED
});

export const getLoggedUser = (id, userType) => {
  return (dispatch) => {
    dispatch(getLoggedUserFetching());
    let BASE_URL;
    switch (userType) {
      case 'CANDIDATE':
        BASE_URL = `${process.env.REACT_APP_API}/candidates`;
        break;
      case 'ADMIN':
        BASE_URL = `${process.env.REACT_APP_API}/admins`;
        break;
      case 'PSYCHOLOGIST':
        BASE_URL = `${process.env.REACT_APP_API}/psychologists`;
        break;
      default:
        break;
    }
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
        dispatch(getLoggedUserFulfilled(response.data));
        return response.data;
      })
      .catch(() => {
        dispatch(getLoggedUserRejected());
      });
  };
};
