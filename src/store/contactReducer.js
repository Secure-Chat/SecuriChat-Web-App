// contactList makeup:
// contactList = {
//   George:{
//     username: George,
//     room: 'somestring',
//     messages: [message1, ...],
//   },
//   Cameron:{
//     username: Cameron,
//     room: 'someotherstring',
//     messages: [message1, ...],
//   },
// }

let initialState = {
  contactList: {},
};

function contactReducer(state = initialState, action) {
  let { type, payload } = action;
  let { contactList } = state;

  switch (type) {
    case 'SET_CONTACTS': {
      contactList = payload;
      return { contactList };
    }
    case 'ADD_CONTACT': {
      const { username, room } = payload;
      if (!(username in contactList)) {
        contactList[username] = {
          username,
          room,
          messages: [],
        };
      }
      return { contactList };
    }
    case 'MESSAGE_READ': {
      const { username, messageTime } = payload;
      for(let i=0; i<contactList[username].messages.length; i++) {
        if (messageTime === contactList[username].messages[i].messageTime) {
          return { contactList };
        }
      }
      contactList[username].messages.push(payload);
      return { contactList };
    }
    case 'RECEIVED': {
      const { room, messageTime } = payload.message
      const { username } = payload;
      if (username === payload.message.username) {
        for (const contact in contactList) {
          if (contactList[contact].room === room) {
            for(let i=0; i<contactList[contact].messages.length; i++) {
              if (messageTime === contactList[contact].messages[i].messageTime) {
                return { contactList };
              }
            }
            contactList[contact].messages.push(payload.message)
          }
        }
      }
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
