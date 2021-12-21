const initialState = {
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGN-IN': {
      const user = action.payload;
      return {...state, user};
    }
    case 'SIGN-OUT':
      return {...state, user: null};
    default:
      return state;
  }
}

export const signin = (user) => {
  return {
    type: 'SIGN-IN',
    payload: user,
  };
};

export const signout = () => {
  return {
    type: 'SIGN_OUT',
  };
};