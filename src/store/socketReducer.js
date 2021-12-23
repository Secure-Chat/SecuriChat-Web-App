'use strict';

const initialState = {
  socket: null
}

export default function socketReducer(state = initialState, action) {
  
  let { type, payload } = action;
  let { socket } = state;

  switch (type) {
    case 'CONNECT': {
      const { client } = payload;
      socket = client

      return { socket };
    }
    case 'DISCONNECT': {
      socket.disconnect();
      return { socket: null };
    }
    case 'SEND_MESSAGE': {
      const { username, message, room } = payload;
      socket.emit('send', {
        username,
        message,
        room
      })
      return { socket };
    }
    case 'MESSAGE': {
      socket.emit('received', payload)
    }
    default:
      return state;
  }
  // useEffect(() => {
  //   const socket = socketIOClient(SOCKET_SERVER_URL);
  //   socket.on()

  //   return () => socket.disconnect();
  // }, [])


}