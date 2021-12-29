import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../../context/socket';
import { saveUserData } from '../middleware/dataStore';
import Chat from '../chat/Chat';
import ContactSettings from '../settings/ContactSettings';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: "80%"
};

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

  const handleOpen = (e, contact) => {
    setShowContact(contact);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false)
  }

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

    socket.on('disconnect', () => console.log('disconnected'));

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
      const lastMessage = `${
        currentContact.messages.length
          ? currentContact.messages[currentContact.messages.length - 1].message.substring(0, 20)
          : ''
      }`;
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

  if (!displayList.length) {
    return (
      <>
        <h1>{props.user.userInfo.username}</h1>
        <h2>Contacts</h2>
        <p>Friend Code: {props.user.userInfo.friendCode}</p>
        <Typography align="center"><LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />}>Contacts are loading</LoadingButton></Typography>
      </>
    )
  }
  return (
    <>
      <h1>{props.user.userInfo.username}</h1>
      <h2>Contacts</h2>
      <p>Friend Code: {props.user.userInfo.friendCode}</p>
      <div >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          aria-label="contacts"
        >
          {displayList.map((contact, idx) => {
            return (
              <ListItem key={idx} component="div" disablePadding>
                <ListItemButton onClick={(e) => handleOpen(e, contact)}>
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
        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Chat
              contact={showContact.contact}
              room={showContact.room}
              encryptionStatus={encryptionStatus}
            />
          </Box>
        </Modal>
      </div>
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
