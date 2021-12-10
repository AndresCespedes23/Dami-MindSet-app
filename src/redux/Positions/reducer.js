import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED
  /* ADD_POSITIONS_FETCHING,
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
    GET_ONE_POSITION_REJECTED */
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  position: null
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
    default:
      return state;
  }
};

export default positionsReducer;
