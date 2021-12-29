const initialState = {
  userInfo: {username: "hi"},
};

export default function userReducer(state = initialState, action) {

  let { type, payload } = action;
  let { userInfo } = state;

  switch (type) {
    case 'SIGN_IN': {
      userInfo = payload;
      return { userInfo };
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