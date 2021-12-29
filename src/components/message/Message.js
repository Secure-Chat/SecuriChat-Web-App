//imports
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';

const useStyles = makeStyles({
  container: {
    bottom: 0,
  },
  bubbleContainer: {
    width: "100%",
    display: "flex"
  },
  bubble: {
    border: "0.5px solid black",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    display: "inline-block"
  },
  chatWindow: {
    maxWidth: "500px",
    maxHeight: "90%",
    overflow: "scroll"
  },
  username: {
    fontWeight: "bold"
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(function Message(props) {
  const classes = useStyles();

  const chatBubbles = props.messageList.map((obj, idx) => (
    <div className={`${classes.bubbleContainer} ${(props.user.userInfo.username === obj.username) ?
      "right" : "left" }`} key={idx}>
      <div key={idx+1} className={classes.bubble}>
        <div className={classes.username}>{obj.username}</div>
        <div className={classes.button}>{obj.message}</div>
      </div>
    </div>
  ));
  return (
    <Paper variant="outlined" className={classes.chatWindow}>
      <div className={classes.container}>{chatBubbles}</div>
    </Paper>
  );
});
