//imports
import { Card, CardContent, CardHeader } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';

//components
import Chat from '../chat/Chat';

const mapStateToProps = (state) => {
  return {
    contactlist: state.contactlist,
  };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Contacts(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      {props.contactlist.map((contact) => {
        return (
          <>
            <Card value={contact.messages} onClick={setShow(true)}>
              <CardHeader>{contact.username}</CardHeader>
              <CardContent>{contact.messages[contact.messages.length - 1]}</CardContent>
            </Card>
            <Chat messages={contact.messages} show={show} onClose={setShow} />
          </>
        );
      })}
    </>
  );
});
