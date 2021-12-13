import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED
} from '../../constants/actionTypes';
const initialState = {
  isLoading: false,
  isLoadingForm: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  admin: null
};

const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMINS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_ADMINS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get admins'
      };
    default:
      return state;
  }
};

export default adminsReducer;
