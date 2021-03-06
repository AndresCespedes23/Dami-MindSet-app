import {
  SET_REGISTER_INFO,
  SET_PERSONAL_INFO,
  SET_EDUCATION_INFO,
  SET_WORK_EXPERIENCE_INFO,
  SET_COURSES_INFO,
  SET_DESCRIPTION_INFO,
  SET_OTHER_INFO,
  REGISTER_NEW_POSTULANT_ACCOUNT_FETCHING,
  REGISTER_NEW_POSTULANT_ACCOUNT_FULFILLED,
  REGISTER_NEW_POSTULANT_ACCOUNT_REJECTED,
  SET_AVAILABILITY
} from 'constants/actionTypes';

const initialState = {
  postulantData: { education: [], workExperience: [], courses: [], availability: [] },
  isLoading: false
};

const postulantsModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_INFO:
      return {
        ...state,
        postulantData: { ...state.postulantData, ...action.payload }
      };
    case SET_PERSONAL_INFO:
      return {
        ...state,
        postulantData: { ...state.postulantData, ...action.payload }
      };
    case SET_EDUCATION_INFO:
      return {
        ...state,
        postulantData: {
          ...state.postulantData,
          education: [...state.postulantData.education, action.payload]
        }
      };
    case SET_WORK_EXPERIENCE_INFO:
      return {
        ...state,
        postulantData: {
          ...state.postulantData,
          workExperience: [...state.postulantData.workExperience, action.payload]
        }
      };
    case SET_COURSES_INFO:
      return {
        ...state,
        postulantData: {
          ...state.postulantData,
          courses: [...state.postulantData.courses, action.payload]
        }
      };
    case SET_DESCRIPTION_INFO:
      return {
        ...state,
        postulantData: { ...state.postulantData, ...action.payload }
      };
    case SET_OTHER_INFO:
      return {
        ...state,
        postulantData: { ...state.postulantData, ...action.payload }
      };
    case SET_AVAILABILITY:
      return {
        ...state,
        postulantData: {
          ...state.postulantData,
          availability: action.payload
        }
      };
    case REGISTER_NEW_POSTULANT_ACCOUNT_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case REGISTER_NEW_POSTULANT_ACCOUNT_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case REGISTER_NEW_POSTULANT_ACCOUNT_REJECTED:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default postulantsModuleReducer;
