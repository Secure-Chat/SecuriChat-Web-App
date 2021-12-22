// contactList makeup:
// contactList = {
//   George:{
//     room: 'somestring',
//     messages: [message1, ...],
//   },
//   Cameron:{
//     room: 'someotherstring',
//     messages: [message1, ...],
//   },
// }

let initialState = {
  contactList: {}
}

function contactReducer(state = initialState, action) {

  let { type, payload } = action;
  let { contactList } = state;

  switch (type) {
    case 'SET_CONTACTS': {
      contactList = payload;
      return { contactList };
    }
    case 'ADD_CONTACT': {
      const { username, global, room } = payload
      if (!(username in contactList)) {
        contactList[username] = {
          global, room,
          messages: []
        };
      }
      return { contactList };
    }
    case 'MESSAGE': {
      const { username } = payload;
      contactList[username].messages.push(payload);
      return { contactList };
    }
    case 'SIGN_OUT': {
      return { contactList: {} };
    }
    default:
      return state;
  }
}

export default contactReducer;