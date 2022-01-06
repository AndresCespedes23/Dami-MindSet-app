import {
  GET_PROFILE_STATISTICS_FETCHING,
  GET_PROFILE_STATISTICS_FULFILLED,
  GET_PROFILE_STATISTICS_REJECTED
} from 'constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/statistics`;

const getProfileStatisticsFetching = () => ({
  type: GET_PROFILE_STATISTICS_FETCHING
});

const getProfileStatisticsFulfilled = (payload) => ({
  type: GET_PROFILE_STATISTICS_FULFILLED,
  payload
});

const getProfileStatisticsRejected = () => ({
  type: GET_PROFILE_STATISTICS_REJECTED
});

export const getProfileStatistics = () => {
  return (dispatch) => {
    dispatch(getProfileStatisticsFetching());
    fetch(`${BASE_URL}/profile`, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        dispatch(getProfileStatisticsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getProfileStatisticsRejected());
      });
  };
};
