import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { saveUserData } from '../middleware/dataStore';

const SOCKET_SERVER_URL = process.env.SOCKET_SERVER_URL;

function Socket({connectUser, disconnectUser, sendMessage, message, messageReceipt, ...props}) {

  const joinAll = (socket) => {
    let rooms = [];
    for (const contact in props.contacts.contactList) {
      rooms.push(contact.room);
    }
    const payload = { rooms };
    socket.emit( 'join', payload );
  }

  useEffect(() => {
    const client = socketIOClient(SOCKET_SERVER_URL);
    connectUser({client});
    joinAll(client);

    client.on('roomSyncRequest', (payload) => {
      const { room } = payload;
    
      for (const message of props.messageQueue.messageQueue[room]) {
        sendMessage({
          username: props.user.username,
          message,
          room
        })
      }
    })
    
    client.on('received', (message) => {
      const username = props.user.username;
      messageReceipt({
        username,
        message
      });
    })

    client.on('message', (payload) => {
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
    socket: state.socket,
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
