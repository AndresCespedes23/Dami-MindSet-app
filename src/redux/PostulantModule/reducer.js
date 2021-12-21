const initialState = {
  registerInfo: {},
  personalInfo: {},
  educationInfo: [{}]
};

const postulantsModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REGISTER_INFO':
      return {
        ...state,
        registerInfo: action.payload
      };
    case 'SET_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: action.payload
      };
    case 'SET_EDUCATION_INFO':
      return {
        ...state,
        educationInfo: [...state.educationInfo, action.payload]
      };
    default:
      return state;
  }
};

export default postulantsModuleReducer;
