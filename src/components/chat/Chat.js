//imports
import { Button, FormControl, Modal, TextField } from '@mui/material';
import React from 'react';

//components
import Message from '../message/Message';

export default function Chat(props) {
  const handleMessage = (e) => {
    // Insert message adding software here... can be code from reducer
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
          <TextField onChange={props.setMessage}></TextField>
          <Button type="submit">Send</Button>
        </FormControl>
      </Modal>
    </>
  );
}
