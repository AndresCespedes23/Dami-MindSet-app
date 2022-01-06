import {
  GET_PROFILE_STATISTICS_FETCHING,
  GET_PROFILE_STATISTICS_FULFILLED,
  GET_PROFILE_STATISTICS_REJECTED
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  showModal: false,
  showMessage: false
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_STATISTICS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROFILE_STATISTICS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PROFILE_STATISTICS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get sessions'
      };
  }
};

export default statisticsReducer;
