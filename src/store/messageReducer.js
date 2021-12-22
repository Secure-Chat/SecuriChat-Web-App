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
    case 'SEND_MESSAGE': {
      const { room, message } = payload;
      if(!(room in messageQueue)) messageQueue[room] = [];
      messageQueue[room].push(message);
      return { messageQueue };
    }
    case 'RECEIVED': {
      const { username } = payload;
      const { room, message } = payload.message;
      if (username === message.username) {
        const messagePosition = messageQueue[room].indexOf(message);
        if (messagePosition > -1) messageQueue[room].slice(messagePosition, 1);
      }
      return { messageQueue };
    }
    default: 
      return state;
  }
}

export default messageReducer;