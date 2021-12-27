// Imports
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import base64 from 'base-64';
import { getUserData } from '../middleware/dataStore';
import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, Paper, Typography } from '@mui/material';

// Components

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    messageQueue: state.messageQueue,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signin: (response) => dispatch({ type: 'SIGN_IN', payload: response }),
  setContacts: (payload) => dispatch({ type: 'SET_CONTACTS', payload }),
  setMessageQueue: (payload) => dispatch({ type: 'SET_MESSAGEQUEUE', payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Login(props) {
  // const socket = useContext(SocketContext);
  const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

  const loginHandler = (e) => {
    e.preventDefault();
    const loginData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const loginString = `${loginData.username}:${loginData.password}`;
    axios
      .post(
        `${REACT_APP_DATABASE_URL}/signin`,
        {},
        {
          headers: {
            Authorization: `Basic ${base64.encode(loginString)}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const { userInfo } = response.data;
        props.signin(userInfo);
        let userData = getUserData(userInfo);
        let { messageQueue, contactList } = userData;

        for (const friend of userInfo.friendsList) {
          console.log(friend);
          if (!(friend.friendName in contactList)) {
            contactList[friend.friendName] = {
              room: friend.room,
              messages: [],
            };
          }
        }

        props.setMessageQueue(messageQueue);
        props.setContacts(contactList);
        props.toggleLoggedIn();
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Paper>
      <Typography>
        <form onSubmit={loginHandler}>
          <FormLabel>Sign-In</FormLabel>
          <FormControl className="form-group">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input type="text" name="username" className="form-control" />
          </FormControl>
          <FormControl className="form-group">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input type="password" name="password" className="form-control" />
          </FormControl>
          <Button type="submit" className="btn btn-primary float-right">
            Submit
          </Button>
        </form>
      </Typography>
    </Paper>
  );
});
