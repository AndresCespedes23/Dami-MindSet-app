import {
  UPDATE_EDUCATION_FETCHING,
  UPDATE_EDUCATION_FULFILLED,
  UPDATE_EDUCATION_REJECTED
} from 'constants/actionTypes';

const initialState = {
  postulant: { education: [] },
  isLoading: false
};

const educationModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDUCATION_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_EDUCATION_FULFILLED:
      return {
        ...state,
        education: state.education.map((education) =>
          education._id === action.payload._id ? action.payload : education
        ),
        loading: false
      };
    case UPDATE_EDUCATION_REJECTED:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default educationModuleReducer;
