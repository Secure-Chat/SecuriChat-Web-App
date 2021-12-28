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
        <div className="messageRight">
          <div classname="bubblePoint"></div>
          <div className="messageContent">{props.message.message}</div>
          <div className="messageTime">{props.message.messageTime}</div>
        </div>
      ) : (
        <div className="messageLeft">
          <div classname="bubblePoint"></div>
          <div className="messageContent">{props.message.message}</div>
          <div className="messageTime">{props.message.messageTime}</div>
        </div>
      )}
    </>
  );
});
