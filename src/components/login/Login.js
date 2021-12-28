// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import base64 from 'base-64';
import { getUserData } from '../middleware/dataStore';

// Styles
import './Login.scss';
import { Button, FormLabel, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  const [showPassword, setShowPassword] = useState(false);
  const setPasswordIcon = showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    setShowPassword(!showPassword);
  };

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
          // // for testing: clear chat history for user logging in
          // contactList[friend.friendName] = {
          //   room: friend.room,
          //   messages: [],
          // };
          
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
            <TextField
              required
              className="login-field"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onClick={handleShowPassword}
              onMouseDown={handleMouseDownPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} onMouseDown={handleMouseDownPassword}>
                      {setPasswordIcon}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
