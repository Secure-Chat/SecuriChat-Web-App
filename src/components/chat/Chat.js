//imports
import { Button, FormControl, Modal, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../../context/socket';

//components
import Message from '../message/Message';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
)(function Chat(props) {
  const socket = useContext(SocketContext);
  const handleMessage = (e) => {
    socket.emit('send', {
      message: e.target.messageToSend.value,
      username: props.user.userInfo.username,
      room: props.room
    })
  };

  return (
    <>
      <Modal open={props.show} onClose={e=>props.toggleModal(e, props.contact)}>
        <div>
          {props.messages.map((message) => (
            <Message message={message} />
          ))}
        </div>
        <FormControl onSubmit={handleMessage}>
          <TextField onChange={props.setMessage} name="messageToSend"></TextField>
          <Button variant="outlined" type="submit">
            Send
          </Button>
        </FormControl>
      </Modal>
    </>
  );
});
