//imports
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { saveUserData } from '../middleware/dataStore';
import { connect } from 'react-redux';
import { SocketContext } from '../../context/socket';

//components
import Message from '../message/Message';

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    messageQueue: state.messageQueue,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  readMessage: (payload) => dispatch({ type: 'MESSAGE_READ', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(function Chat(props) {
  const socket = useContext(SocketContext);
  const [messageToSend, setMessageToSend] = useState('');
  const [messageList, setMessageList] = useState([]);

  const handleMessageToSend = (e) => {
    setMessageToSend(e.target.value);
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    // console.log('sending')
    // console.log({
    //   message: messageToSend,
    //   username: props.user.userInfo.username,
    //   room: props.room,
    // })
    // console.log(socket)
    socket.emit('send', {
      message: messageToSend,
      username: props.user.userInfo.username,
      room: props.room,
    });
    setMessageToSend('');
  };

  useEffect(() => {
    if (!socket.connected) socket.connect();

    return () => {
      saveUserData({
        userInfo: props.user.userInfo,
        messageQueue: props.messageQueue.messageQueue,
        contactList: props.contacts.contactList,
      });
    }
  }, [socket])

  useEffect(() => {
    let theQueue = [];
    let chatHistory = [];
    if (props.messageQueue.messageQueue[props.room]) theQueue = [...props.messageQueue.messageQueue[props.room]];
    if (props.contacts.contactList[props.contact].messages) chatHistory = [...props.contacts.contactList[props.contact].messages];

    for ( const message of theQueue ) {
      if ( !(message.username === props.user.userInfo.username) ) {
        props.readMessage({
          room: props.room,
          message: message.message,
          username: message.username,
          messageTime: message.messageTime
        })
      } else {
        chatHistory.push(message);
      }
    }

    // a quick bubble sort
    for (let i = 0; i < chatHistory.length; i++) {
      for (let j = 0; j < chatHistory.length - i - 1; j++) {
        if (chatHistory[j].messageTime > chatHistory[j + 1].messageTime) {
          const temp = chatHistory[j];
          chatHistory[j] = chatHistory[j + 1];
          chatHistory[j + 1] = temp;
        }
      }
    }

    setMessageList(chatHistory);

  }, [props.messageQueue, props.room, props.contact, props.contactList])

  return (
    <>
      <div>
        <div className="chatHistory">
          <div>
            <Message messageList={messageList} />
          </div>
        </div>
        <form onSubmit={handleSendMessage}>
          <TextField 
            onChange={handleMessageToSend} 
            name="messageToSend"
            value={messageToSend}></TextField>
          <Button variant="outlined" type="submit">
            Send
          </Button>
        </form>
      </div>
    </>
  );
});
