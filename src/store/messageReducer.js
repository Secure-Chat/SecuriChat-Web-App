// messageQueue: {
//   (roomId): [
//     {
//       message: 'a message',
//       username: 'the sender',
//       messageTime: 'returned from socket server'
//     }
//   ]
// }

const initialState = {
  messageQueue: {}
}

function messageReducer(state = initialState, action) {

  let { type, payload } = action;
  let { messageQueue } = state;

  switch (type) {
    case 'SET_MESSAGEQUEUE': {
      messageQueue = payload;
      return { messageQueue };
    }
    case 'MESSAGE_READ': {
      const { room, message, username, messageTime } = payload;
      for(let i=0; i<messageQueue[room].length; i++) {
        if (messageTime === messageQueue[room][i].messageTime) {
          messageQueue[room].splice(i,1);
        }
      }
      return { messageQueue }
    }
    case 'MESSAGE': {
      const { room, message, username, messageTime } = payload;
      if(!(room in messageQueue)) messageQueue[room] = [];
      for (const qMessage of messageQueue[room]) {
        if(qMessage.messageTime === messageTime) return { messageQueue }
      }
      messageQueue[room].push({
        message,
        username,
        messageTime
      });
      return { messageQueue };
    }
    case 'RECEIVED': {
      const { room, messageTime } = payload.message
      const { username } = payload;
      if (username === payload.message.username) {
        for(let i=0; i<messageQueue[room].length; i++) {
          if (messageTime === messageQueue[room][i].messageTime) {
            messageQueue[room].splice(i,1);
          }
        }
      }
      return { messageQueue };
    }
    default: 
      return state;
  }
}

export default messageReducer;