const initialState = {
  contacts = [],
}

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET-CONTACTS': {
      return state;
    }
    
    default:
      return state;
  }
}

// export const getContacts = () => {
//   return {
//     type: 'ADD_TO_CART',
//     payload: product,
//   };
// };

// export const removeFromCart = (product) => {
//   return {
//     type: 'REMOVE_FROM_CART',
//     payload: product,
//   };
// };