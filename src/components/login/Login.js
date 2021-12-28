// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import base64 from 'base-64';
import { getUserData } from '../middleware/dataStore';

// Styles
import './Login.scss';
import { Button, FormLabel, Paper, TextField, Typography } from '@mui/material';

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
        const { userInfo } = response.data;
        props.signin(userInfo);
        const userData = getUserData(userInfo);
        const { messageQueue, contactList } = userData;

        for (const friend of userInfo.friendsList) {
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
    <Paper id="login-div">
      <Typography>
        <div>
          <form onSubmit={loginHandler}>
            <FormLabel id="label">Sign-In</FormLabel>
            <TextField required className="login-field" label="Username" name="username" />
            <TextField required className="login-field" label="Password" type="password" name="password" />
            <Button id="submit" variant="contained" type="submit">
              Submit
            </Button>
          </form>
          <fieldset className="create-account-field">
            <legend>New to SecuriChat?</legend>
            <Button variant="outlined" component={NavLink} to="/signup">
              Create an Account
            </Button>
          </fieldset>
        </div>
      </Typography>
    </Paper>
  );
});
