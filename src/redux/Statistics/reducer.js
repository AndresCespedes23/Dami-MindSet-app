import {
  GET_QUANTITY_STATISTICS_FETCHING,
  GET_QUANTITY_STATISTICS_FULFILLED,
  GET_QUANTITY_STATISTICS_REJECTED
} from 'constants/actionTypes';

const initialState = {
  data: {},
  isLoading: false,
  error: false,
  messageType: '',
  messageText: ''
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUANTITY_STATISTICS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_QUANTITY_STATISTICS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case GET_QUANTITY_STATISTICS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get sessions'
      };
    default:
      return state;
  }
};

export default statisticsReducer;
