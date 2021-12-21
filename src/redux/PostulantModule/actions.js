import {
  SET_REGISTER_INFO,
  SET_PERSONAL_INFO,
  SET_EDUCATION_INFO,
  SET_WORK_EXPERIENCE_INFO,
  SET_COURSES_INFO,
  SET_DESCRIPTION_INFO,
  SET_OTHER_INFO
} from 'constants/actionTypes';

export const setRegisterInfo = (payload) => ({ type: SET_REGISTER_INFO, payload });
export const setPersonalInfo = (payload) => ({ type: SET_PERSONAL_INFO, payload });
export const setEducationInfo = (payload) => ({ type: SET_EDUCATION_INFO, payload });
export const setExperienceInfo = (payload) => ({ type: SET_WORK_EXPERIENCE_INFO, payload });
export const setCoursesInfo = (payload) => ({ type: SET_COURSES_INFO, payload });
export const setDescriptionInfo = (payload) => ({ type: SET_DESCRIPTION_INFO, payload });
export const setOtherInfo = (payload) => ({ type: SET_OTHER_INFO, payload });
