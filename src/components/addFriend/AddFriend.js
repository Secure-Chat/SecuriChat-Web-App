// Imports
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

// Styles
import { Button, FormLabel, Paper, TextField, Typography } from '@mui/material';

// Components

const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addFriend: (payload) => dispatch({ type: 'ADD_CONTACT', payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function AddFriend(props) {
  const [redirect, setRedirect] = useState(false);

  const addFriendHandler = (e) => {
    e.preventDefault();
    const { token } = props.user.userInfo;

    axios({
      method: 'put',
      url: `${REACT_APP_DATABASE_URL}/addFriend`,
      headers: {
        Authorization: `token ${token}`
      },
      data: {
        "friendCode": e.target.friendCode.value
      }
    })
    .then((response) => {
      const userInfo = response.data;

      for (const friend in userInfo.friendsList) {
        props.addFriend({
          username: userInfo.friendsList[friend].friendName,
          room: userInfo.friendsList[friend].room,
        })
      }
      setRedirect(true);
    })
    .catch((error) => console.log(error.message));
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <Paper id="login-div">
      <Typography>
        <div>
          <form onSubmit={addFriendHandler}>
            <FormLabel id="label">Enter Friend Code</FormLabel>
            <TextField required className="login-field" label="FriendCode" name="friendCode" />
            <Button id="submit" variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </Typography>
    </Paper>
  );
});