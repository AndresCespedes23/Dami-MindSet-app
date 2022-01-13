import {
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  ADD_INTERVIEW_FETCHING,
  ADD_INTERVIEW_FULFILLED,
  ADD_INTERVIEW_REJECTED,
  DELETE_INTERVIEW_FETCHING,
  DELETE_INTERVIEW_FULFILLED,
  DELETE_INTERVIEW_REJECTED,
  UPDATE_INTERVIEW_FETCHING,
  UPDATE_INTERVIEW_FULFILLED,
  UPDATE_INTERVIEW_REJECTED,
  GET_ONE_INTERVIEW_FETCHING,
  GET_ONE_INTERVIEW_FULFILLED,
  GET_ONE_INTERVIEW_REJECTED,
  SHOW_MODAL,
  SHOW_MESSAGE,
  MODAL_TYPE,
  CLEAN_ERROR,
  CLEAN_SELECTED_INTERVIEW,
  GET_PENDING_INTERVIEW_FETCHING,
  GET_PENDING_INTERVIEW_FULFILLED,
  GET_PENDING_INTERVIEW_REJECTED,
  GET_COMPLETED_INTERVIEW_FETCHING,
  GET_COMPLETED_INTERVIEW_FULFILLED,
  GET_COMPLETED_INTERVIEW_REJECTED
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  isLoadingForm: false,
  list: [],
  error: false,
  messageType: '',
  messageText: '',
  interview: {},
  showModal: false,
  showMessage: false
};

const interviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_INTERVIEWS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get interviews'
      };
    case ADD_INTERVIEW_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_INTERVIEW_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Added interview',
        list: [...state.list, action.payload]
      };
    case ADD_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot add interview'
      };
    case DELETE_INTERVIEW_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_INTERVIEW_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'interview deleted',
        list: state.list.filter((interview) => interview.id !== action.payload)
      };
    case DELETE_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot delete interview'
      };
    case UPDATE_INTERVIEW_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_INTERVIEW_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messageType: 'success',
        messageText: 'Updated interview',
        list: state.list.map((interview) => {
          if (interview._id === action.payload.id) {
            return action.payload;
          }
          return interview;
        })
      };
    case UPDATE_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot update interview'
      };
    case GET_ONE_INTERVIEW_FETCHING:
      return {
        ...state,
        isLoadingForm: true
      };
    case GET_ONE_INTERVIEW_FULFILLED:
      return {
        ...state,
        isLoadingForm: false,
        interview: action.payload
      };
    case GET_ONE_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoadingForm: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get interview'
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
    case CLEAN_SELECTED_INTERVIEW: {
      return {
        ...state,
        interview: initialState.interview
      };
    }
    case GET_PENDING_INTERVIEW_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PENDING_INTERVIEW_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PENDING_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get pending interviews'
      };
    case GET_COMPLETED_INTERVIEW_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_COMPLETED_INTERVIEW_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_COMPLETED_INTERVIEW_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        messageType: 'error',
        messageText: 'Cannot get completed interviews'
      };
    default:
      return state;
  }
};

export default interviewsReducer;
