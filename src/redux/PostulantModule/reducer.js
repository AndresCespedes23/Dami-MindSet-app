import {
  SET_REGISTER_INFO,
  SET_PERSONAL_INFO,
  SET_EDUCATION_INFO,
  SET_WORK_EXPERIENCE_INFO
} from 'constants/actionTypes';

const initialState = {
  postulantData: { education: [], workExperience: [], courses: [] }
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
    default:
      return state;
  }
};

export default postulantsModuleReducer;
