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
  GET_ONE_CLIENTS_REJECTED,
  SHOW_MODAL,
  SHOW_MESSAGE,
  MODAL_TYPE
} from 'constants/actionTypes';
const initialState = {
  isLoading: false,
  isLoadingForm: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  client: {},
  showModal: false,
  showMessage: false
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
        ...state
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
        list: state.list.filter((client) => client.id !== action.payload)
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
        list: state.list.map((client) => {
          if (client._id === action.payload.id) {
            return action.payload;
          }
          return client;
        })
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
        isLoadingForm: true
      };
    case GET_ONE_CLIENTS_FULFILLED: {
      return {
        ...state,
        isLoadingForm: false,
        client: action.payload
      };
    }
    case GET_ONE_CLIENTS_REJECTED:
      return {
        ...state,
        isLoadingForm: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get one Clients'
      };
    case SHOW_MODAL: {
      return {
        ...state,
        showModal: action.showModal
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        showMessage: action.showMessage
      };
    }
    case MODAL_TYPE: {
      return {
        ...state,
        modalType: action.modalType
      };
    }
    default:
      return state;
  }
};

export default clientsReducer;
