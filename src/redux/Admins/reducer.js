const initialState = {
  list: []
};

const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST_ADMIN':
      return {
        ...state,
        list: [
          ...state.list,
          {
            test: action.test
          }
        ]
      };
    default:
      return state;
  }
};

export default adminsReducer;
