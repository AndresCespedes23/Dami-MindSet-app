import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  ADD_CLIENTS_FETCHING,
  ADD_CLIENTS_FULFILLED,
  ADD_CLIENTS_REJECTED
  //   DELETE_CLIENTS_FETCHING,
  //   DELETE_CLIENTS_FULFILLED,
  //   DELETE_CLIENTS_REJECTED
} from '../../constants/actionTypes';
const initialState = {
  isLoading: false,
  list: [],
  error: false,
  messageType: '',
  messageText: ''
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_CLIENTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get Clients'
      };
    case ADD_CLIENTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_CLIENTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    // case DELETE_CLIENTS_FETCHING:
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    // case DELETE_CLIENTS_FULFILLED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     list: state.list.filter((application) => application._id !== action.payload)
    //   };
    // case DELETE_CLIENTS_REJECTED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: true
    //   };
    default:
      return state;
  }
};

export default clientsReducer;
