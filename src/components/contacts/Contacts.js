import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../../context/socket';
import { saveUserData } from '../middleware/dataStore';

function Contacts(props) {
  const socket = useContext(SocketContext);
  const { user, contacts, messageQueue, messageReceipt, message } = props; 
  const [ displayList, setDisplayList ] = useState([]);

  useEffect(() => {
    let rooms = [];
    for (const contact in contacts.contactList) {
      rooms.push(contact.room);
    }
    const payload = { rooms };
    socket.emit('join', payload);

    socket.on('roomSyncRequest', (payload) => {
      const { room } = payload;
    
      for (const message of messageQueue.messageQueue[room]) {
        if (message.username === user.userInfo.username) {
          const sendPayload = {
            username: user.userInfo.username,
            message: message.message,
            room
          }
          if ('messageTime' in message) sendPayload['messageTime'] = message.messageTime;
          socket.emit('send', sendPayload)
        }
      }
    })

    socket.on('received', (message) => {
      const username = user.userInfo.username;
      messageReceipt({
        username,
        message
      });
    })

    socket.on('message', (payload) => {
      message(payload);
    })

    return () => {
      socket.removeAllListeners();
      saveUserData({
        userInfo: user.userInfo,
        messageQueue: messageQueue.messageQueue,
        contactList: contacts.contactList
      })
    }
  }, [socket, user, contacts, messageQueue, messageReceipt, message])

  useEffect(() => {
    const theList = [];
    for (const contact in contacts.contactList) {
      let receivedCount = 0;
      let sentCount = 0;
      if (messageQueue.messageQueue[contact.room]) {
        for (const message of messageQueue.messageQueue[contact.room]) {
          if ( user.userInfo.username === message.username ) {
            sentCount++;
          } else {
            receivedCount++;
          }
        }
      }
      theList.push({
        contact: contact.username,
        receivedCount,
        sentCount
      })
    }
    // a quick bubble sort
    for (let i=0; i < theList.length; i++) {
      for (let j=0; j < ( theList.length - i -1 ); j++) {
        if( theList[j].contact > theList[j+1].contact ) {
          const temp = theList[j];
          theList[j] = theList[j+1];
          theList[j+1] = temp;
        }
      }
    }

    setDisplayList(theList)
  }, [contacts, messageQueue, user])

  return (
    <>
      <div className='contact-list'>
        {displayList.map((contact, idx) => {
          return (
            <div className='contact-entry' key={idx}>
              {contact.receivedCount ?
              <div className='messageCount incoming'></div> :
              <></>
              }
              <div className='contact-name'>{contact.contact}</div>
              {contact.sentCount ?
              <div className='messageCount outgoing'></div> :
              <></>
              }
            </div>
          )
        })}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    messageQueue: state.messageQueue,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => ({
  connectUser: () => dispatch({type: 'CONNECT', payload: null}),
  message: (payload) => dispatch({type: 'MESSAGE', payload}),
  messageReceipt: (payload) => dispatch({type: 'RECEIVED', payload}),
  disconnectUser: () => dispatch({type: 'DISCONNECT', payload: null}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);