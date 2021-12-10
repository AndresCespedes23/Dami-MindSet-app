import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJETED,
  ADD_POSTULANTS_FETCHING,
  ADD_POSTULANTS_FULFILLED,
  ADD_POSTULANTS_REJETED
  //DELETE_POSTULANTS_FETCHING,
  //DELETE_POSTULANTS_FULFILLED,
  //DELETE_POSTULANTS_REJETED,
  //UPDATE_POSTULANTS_FETCHING,
  //UPDATE_POSTULANTS_FULFILLED,
  //UPDATE_POSTULANTS_REJETED,
  //GET_ONE_POSTULANTS_FETCHING,
  //GET_ONE_POSTULANTS_FULFILLED,
  //GET_ONE_POSTULANTS_REJETED,
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  messageType: '',
  messageText: ''
};

const postulantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_POSTULANTS_REJETED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error getting postulants',
        messageText: 'cannot get postulants'
      };
    case ADD_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_POSTULANTS_REJETED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    //case DELETE_POSTULANTS_FETCHING:
    //  return {
    //    ...state,
    //    isLoading: true
    //  };
    //case DELETE_POSTULANTS_FULFILLED:
    //  return {
    //    ...state,
    //    isLoading: false,
    //    list: state.list.filter((application) => application._id !== action.payloas)
    //  };
    //case DELETE_POSTULANTS_REJETED:
    //  return {
    //    ...state,
    //    isLoading: false,
    //    error: true
    //  };
    default:
      return state;
  }
};

export default postulantsReducer;
