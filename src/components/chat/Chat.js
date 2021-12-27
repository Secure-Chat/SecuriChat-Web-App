//imports
import { Button, FormControl, Modal, TextField } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';

//components
import Message from '../message/Message';

const mapStateToProps = (state) => {
  return {
    // I may need to use the message state for this contact, in the case that the component does rerender... doubt it though
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (payload) => dispatch({ type: 'SEND-MESSAGE', payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Chat(props) {
  const handleMessage = (e) => {
    props.sendMessage({ message: e.target.messageToSend.value, username: props.username, room: props.room });
  };

  return (
    <>
      <Modal show={props.show} onClose={props.setShow(false)}>
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
