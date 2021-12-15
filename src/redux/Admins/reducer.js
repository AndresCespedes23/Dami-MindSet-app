import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  UPDATE_ADMINS_FETCHING,
  UPDATE_ADMINS_FULFILLED,
  UPDATE_ADMINS_REJECTED,
  GET_ONE_ADMIN_FETCHING,
  GET_ONE_ADMIN_FULFILLED,
  GET_ONE_ADMIN_REJECTED,
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
  admin: {},
  showModal: false,
  showMessage: false
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
    case UPDATE_ADMINS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_ADMINS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Updated Admin',
        list: state.list.map((admin) => {
          if (admin._id === action.payload.id) {
            return action.payload;
          }
          return admin;
        })
      };
    case UPDATE_ADMINS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot update admin'
      };
    case GET_ONE_ADMIN_FETCHING:
      return {
        ...state,
        isLoadingForm: true
      };
    case GET_ONE_ADMIN_FULFILLED:
      return {
        ...state,
        isLoadingForm: false,
        position: action.payload
      };
    case GET_ONE_ADMIN_REJECTED:
      return {
        ...state,
        isLoadingForm: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get admin'
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

export default adminsReducer;
