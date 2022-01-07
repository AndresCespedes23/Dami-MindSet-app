import {
  GET_QUANTITY_STATISTICS_FETCHING,
  GET_QUANTITY_STATISTICS_FULFILLED,
  GET_QUANTITY_STATISTICS_REJECTED
} from 'constants/actionTypes';

const BASE_URL = `${process.env.REACT_APP_API}/statistics`;

const getQuantityStatisticsFetching = () => ({
  type: GET_QUANTITY_STATISTICS_FETCHING
});

const getQuantityStatisticsFulfilled = (payload) => ({
  type: GET_QUANTITY_STATISTICS_FULFILLED,
  payload
});

const getQuantityStatisticsRejected = () => ({
  type: GET_QUANTITY_STATISTICS_REJECTED
});

export const getQuantityStatistics = () => {
  return (dispatch) => {
    dispatch(getQuantityStatisticsFetching());
    fetch(`${BASE_URL}/quantity`, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        console.log(response.data);
        dispatch(getQuantityStatisticsFulfilled(response.data));
      })
      .catch(() => {
        dispatch(getQuantityStatisticsRejected());
      });
  };
};
