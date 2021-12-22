const initialState = {
  user: {},
};

export default function userReducer(state = initialState, action) {

  let { type, payload } = action;
  let { user } = state;

  switch (type) {
    case 'SIGN_IN': {
      user = payload;
      return { user };
    }
    case 'SIGN_OUT':
      return { user: {} };
    default:
      return state;
  }
}

// export const signin = (user) => {
//   return {
//     type: 'SIGN_IN',
//     payload: user,
//   };
// };

// export const signout = () => {
//   return {
//     type: 'SIGN_OUT',
//   };
// };