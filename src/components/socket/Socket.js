import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { saveUserData } from '../middleware/dataStore';



function Socket({connectUser, disconnectUser, sendMessage, message, messageReceipt, ...props}) {

  useEffect(() => {
    connectUser();
    let rooms = [];
    for (const contact in props.contacts.contactList) {
      rooms.push(contact.room);
    }
    const payload = { rooms };
    props.socket.socket.emit( 'join', payload );

    props.socket.socket.on('roomSyncRequest', (payload) => {
      const { room } = payload;
    
      for (const message of props.messageQueue.messageQueue[room]) {
        sendMessage({
          username: props.user.userInfo.username,
          message,
          room
        })
      }
    })
    
    props.socket.socket.on('received', (message) => {
      const username = props.user.userInfo.username;
      messageReceipt({
        username,
        message
      });
    })

    props.socket.socket.on('message', (payload) => {
      message(payload);
    })

    return () => {
      saveUserData(props);
      disconnectUser();
    }
  }, [])

  return (
    <></>
  )
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    messageQueue: state.messageQueue,
    // socket: state.socket,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => ({
  connectUser: () => dispatch({type: 'CONNECT', payload: null}),
  sendMessage: (payload) => dispatch({type: 'SEND_MESSAGE', payload}),
  message: (payload) => dispatch({type: 'MESSAGE', payload}),
  messageReceipt: (payload) => dispatch({type: 'RECEIVED', payload}),
  disconnectUser: () => dispatch({type: 'DISCONNECT', payload: null}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Socket);
