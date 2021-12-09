import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  ADD_CLIENTS_FETCHING,
  ADD_CLIENTS_FULFILLED,
  ADD_CLIENTS_REJECTED,
  DELETE_CLIENTS_FETCHING,
  DELETE_CLIENTS_FULFILLED,
  DELETE_CLIENTS_REJECTED,
  UPDATE_CLIENTS_FETCHING,
  UPDATE_CLIENTS_FULFILLED,
  UPDATE_CLIENTS_REJECTED,
  GET_ONE_CLIENTS_FETCHING,
  GET_ONE_CLIENTS_FULFILLED,
  GET_ONE_CLIENTS_REJECTED
} from '../../constants/actionTypes';
const initialState = {
  isLoading: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  client: null
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
        messageType: 'success',
        messageText: 'Added Client',
        list: [...state.list, action.payload]
      };
    case ADD_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot Add Clients'
      };
    case DELETE_CLIENTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_CLIENTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Deleted Client',
        list: [...state.list, action.payload]
      };
    case DELETE_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot delete Clients'
      };
    case UPDATE_CLIENTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_CLIENTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Updated Client',
        list: [...state.list, action.payload]
      };
    case UPDATE_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot update Clients'
      };
    case GET_ONE_CLIENTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ONE_CLIENTS_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        client: action.payload
      };
    }
    case GET_ONE_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get one Clients'
      };
    default:
      return state;
  }
};

export default clientsReducer;
