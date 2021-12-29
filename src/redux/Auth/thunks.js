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
import firebase from 'helpers/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        sessionStorage.setItem('token', token);
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
        return dispatch(logoutSuccess());
      })
      .catch((error) => {
        return dispatch(logoutError(error.toString()));
      });
  };
};

export const registerNewUser = (credentials) => {
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
