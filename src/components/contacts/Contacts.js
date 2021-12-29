import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../../context/socket';
import { saveUserData } from '../middleware/dataStore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chat from '../chat/Chat';
import ContactSettings from '../settings/ContactSettings';

function Contacts(props) {
  const socket = useContext(SocketContext);
  const [displayList, setDisplayList] = useState([]);
  const [show, setShow] = useState(false);
  const [showContact, setShowContact] = useState({
    contact: '',
    room: '',
    lastMessage: '',
    receivedCount: 0,
    sentCount: 0,
  });

  const [encryptionStatus, setEncryptionStatus] = useState(true);

  const toggleModal = (e, contact) => {
    setShowContact(contact);
    setShow(!show);
  };

  useEffect(() => {
    if (!socket.connected) socket.connect();
    let rooms = [];
    for (const contact in props.contacts.contactList) {
      rooms.push(props.contacts.contactList[contact].room);
    }
    const payload = { rooms };
    socket.emit('join', payload);

    socket.on('roomSyncRequest', (payload) => {
      const { room } = payload;
      if (room in props.messageQueue.messageQueue) {
        for (const message of props.messageQueue.messageQueue[room]) {
          if (message.username === props.user.userInfo.username) {
            const sendPayload = {
              username: props.user.userInfo.username,
              message: message.message,
              room,
            };
            if ('messageTime' in message) sendPayload['messageTime'] = message.messageTime;
            socket.emit('send', sendPayload);
          }
        }
      }
    });

    socket.on('received', (message) => {
      const username = props.user.userInfo.username;
      props.messageReceipt({
        username,
        message,
      });
    });

    socket.on('message', (payload) => {
      props.message(payload);
      if (payload.username !== props.user.userInfo.username) socket.emit('received', payload);
    });

    socket.on('disconnect', () => console.log("disconnected"))

    return () => {
      socket.disconnect();
      saveUserData({
        userInfo: props.user.userInfo,
        messageQueue: props.messageQueue.messageQueue,
        contactList: props.contacts.contactList,
      });
    };
  }, [socket]);

  useEffect(() => {
    const theList = [];
    for (const contact in props.contacts.contactList) {
      const currentContact = props.contacts.contactList[contact];
      let receivedCount = 0;
      let sentCount = 0;
      if (props.messageQueue.messageQueue[currentContact.room]) {
        for (const message of props.messageQueue.messageQueue[currentContact.room]) {
          if (props.user.userInfo.username === message.username) {
            sentCount++;
          } else {
            receivedCount++;
          }
        }
      }
      const lastMessage = `${ currentContact.messages.length ? 
        currentContact.messages[currentContact.messages.length - 1].message.substring(0, 20) :
        '' }`
      theList.push({
        contact,
        room: currentContact.room,
        lastMessage,
        receivedCount,
        sentCount,
      });
    }
    // a quick bubble sort
    for (let i = 0; i < theList.length; i++) {
      for (let j = 0; j < theList.length - i - 1; j++) {
        if (theList[j].contact > theList[j + 1].contact) {
          const temp = theList[j];
          theList[j] = theList[j + 1];
          theList[j + 1] = temp;
        }
      }
    }

    setDisplayList(theList);
  }, [props.contacts, props.messageQueue, props.user]);

  if(!displayList.length) {
    return (<p>Loading...</p>)
  }
  return (
    <>
      <h1>Contacts</h1>
      <div >
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        aria-label="contacts"
      >
        {displayList.map((contact, idx) => {
          return (
            <ListItem key={idx} component="div" disablePadding>
              <ListItemButton onClick={(e) => toggleModal(e, contact)}>
                {contact.receivedCount ? 
                <ListItemIcon><ListItemText primary={`(${contact.receivedCount})`} /></ListItemIcon> : 
                <></>}
                <ListItemText
                  primary={contact.contact}
                  secondary={contact.lastMessage.length ? contact.lastMessage : ''}
                />
                {contact.sentCount ?
                <ListItemIcon><ListItemText primary={`Unsent: (${contact.sentCount})`} /></ListItemIcon> : 
                <></>}
                <ContactSettings 
                  darkMode={props.darkMode}
                  encryptionStatus={encryptionStatus}
                  setEncryptionStatus={setEncryptionStatus}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      </div>
      {show ? (
        <Chat
          contact={showContact.contact}
          room={showContact.room}
          toggleModal={toggleModal}
          encryptionStatus={encryptionStatus}
        />
      ) : (
        <></>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    messageQueue: state.messageQueue,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  connectUser: () => dispatch({ type: 'CONNECT', payload: null }),
  message: (payload) => dispatch({ type: 'MESSAGE', payload }),
  messageReceipt: (payload) => dispatch({ type: 'RECEIVED', payload }),
  disconnectUser: () => dispatch({ type: 'DISCONNECT', payload: null }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
