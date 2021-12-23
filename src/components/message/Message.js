//imports
import React from 'react';
import { connect } from 'react-redux';

//components

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(function Message(props) {
  return (
    <>
      {props.message.username === props.user.userInfo.username ? (
        <p className="messageRight">{props.message.text}</p>
      ) : (
        <p className="messageLeft">{props.message.text}</p>
      )}
    </>
  );
});
