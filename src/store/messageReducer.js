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
      const messagePosition = messageQueue[room].indexOf({
        message,
        username,
        messageTime
      })
      if (messagePosition > -1) messageQueue[room].slice(messagePosition, 1);
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
      const { room, message, username, messageTime } = payload;
      if (username === message.username) {
        const messagePosition = messageQueue[room].indexOf({
          message,
          username,
          messageTime
        })
        if (messagePosition > -1) messageQueue[room].slice(messagePosition, 1);
      }
      return { messageQueue };
    }
    default: 
      return state;
  }
}

export default messageReducer;