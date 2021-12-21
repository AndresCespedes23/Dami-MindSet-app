import {
  SET_REGISTER_INFO,
  SET_PERSONAL_INFO,
  SET_EDUCATION_INFO,
  SET_WORK_EXPERIENCE_INFO
} from 'constants/actionTypes';

const initialState = {
  registerInfo: {},
  personalInfo: {},
  educationInfo: [{}],
  worlExperienceInfo: [{}]
};

const postulantsModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_INFO:
      return {
        ...state,
        registerInfo: action.payload
      };
    case SET_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: action.payload
      };
    case SET_EDUCATION_INFO:
      return {
        ...state,
        educationInfo: [...state.educationInfo, action.payload]
      };
    case SET_WORK_EXPERIENCE_INFO:
      return {
        ...state,
        worlExperienceInfo: [...state.worlExperienceInfo, action.payload]
      };
    default:
      return state;
  }
};

export default postulantsModuleReducer;
