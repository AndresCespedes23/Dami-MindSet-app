const initialState = {
  list: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ADMIN':
      return {
        ...state,
        list: [
          ...state.list,
          {
            name: action.name,
            email: action.email,
            username: action.username,
            password: action.password
          }
        ]
      };
  }
};
