//imports
import React from 'react';
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
  const handleClick = (e) => {};

  return (
    <>
      {props.contactlist.map((contact) => {
        return (
          <div value={contact.messages} onClick={handleClick}>
            <h1>{contact.username}</h1>
            <p>{contact.messages[contact.messages.length - 1]}</p>
          </div>
        );
      })}
    </>
  );
});
