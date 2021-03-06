import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  ADD_POSITIONS_FETCHING,
  ADD_POSITIONS_FULFILLED,
  ADD_POSITIONS_REJECTED,
  DELETE_POSITIONS_FETCHING,
  DELETE_POSITIONS_FULFILLED,
  DELETE_POSITIONS_REJECTED,
  UPDATE_POSITIONS_FETCHING,
  UPDATE_POSITIONS_FULFILLED,
  UPDATE_POSITIONS_REJECTED,
  GET_ONE_POSITION_FETCHING,
  GET_ONE_POSITION_FULFILLED,
  GET_ONE_POSITION_REJECTED,
  GET_CLIENT_POSITIONS_FETCHING,
  GET_CLIENT_POSITIONS_FULFILLED,
  GET_CLIENT_POSITIONS_REJECTED,
  SHOW_MODAL,
  SHOW_MESSAGE,
  MODAL_TYPE,
  CLEAN_ERROR,
  CLEAN_SELECTED_POSITION
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  position: {},
  showModal: false,
  showMessage: false
};

const positionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get positions'
      };
    case ADD_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Added positions',
        list: [...state.list, action.payload]
      };
    case ADD_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot add positions'
      };
    case DELETE_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Position deleted',
        list: state.list.filter((position) => position.id !== action.payload)
      };
    case DELETE_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot delete positions'
      };
    case UPDATE_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Updated positions',
        list: state.list.map((position) => {
          if (position._id === action.payload.id) {
            return action.payload;
          }
          return position;
        })
      };
    case UPDATE_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot update positions'
      };
    case GET_ONE_POSITION_FETCHING:
      return {
        ...state,
        isLoadingForm: true
      };
    case GET_ONE_POSITION_FULFILLED:
      return {
        ...state,
        isLoadingForm: false,
        position: action.payload
      };
    case GET_ONE_POSITION_REJECTED:
      return {
        ...state,
        isLoadingForm: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get session'
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
    case CLEAN_ERROR: {
      return {
        ...state,
        error: initialState.error
      };
    }
    case CLEAN_SELECTED_POSITION: {
      return {
        ...state,
        position: initialState.position
      };
    }
    case GET_CLIENT_POSITIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_CLIENT_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_CLIENT_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get Client Positions'
      };
    default:
      return state;
  }
};

export default positionsReducer;
