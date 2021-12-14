import {
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  ADD_PROFILES_FETCHING,
  ADD_PROFILES_FULFILLED,
  ADD_PROFILES_REJECTED,
  DELETE_PROFILES_FETCHING,
  DELETE_PROFILES_FULFILLED,
  DELETE_PROFILES_REJECTED,
  UPDATE_PROFILES_FETCHING,
  UPDATE_PROFILES_FULFILLED,
  UPDATE_PROFILES_REJECTED,
  GET_ONE_PROFILE_FETCHING,
  GET_ONE_PROFILE_FULFILLED,
  GET_ONE_PROFILE_REJECTED,
  SHOW_MODAL,
  SHOW_MESSAGE,
  MODAL_TYPE
} from '../../constants/actionTypes';
const initialState = {
  isLoading: false,
  isLoadingForm: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  application: null,
  showModal: false,
  showMessage: false
};

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROFILES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get profiles'
      };
    case ADD_PROFILES_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_PROFILES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Profile successfully added',
        list: [...state.list, action.payload]
      };
    case ADD_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Error adding profile'
      };
    case DELETE_PROFILES_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROFILES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Profile deleted successfully',
        list: state.list.filter((profile) => profile.id !== action.payload)
      };
    case DELETE_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Error deleting profile'
      };
    case UPDATE_PROFILES_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROFILES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((profile) => {
          if (profile._id === action.payload.id) {
            return action.payload;
          }
          return profile;
        }),
        messageType: 'success',
        messageText: 'Profile updated successfully'
      };
    case UPDATE_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Error updating profile'
      };
    case GET_ONE_PROFILE_FETCHING:
      return {
        ...state,
        isLoadingForm: true
      };
    case GET_ONE_PROFILE_FULFILLED:
      return {
        ...state,
        isLoadingForm: false,
        application: action.payload
      };
    case GET_ONE_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Error getting profile'
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

export default profilesReducer;
