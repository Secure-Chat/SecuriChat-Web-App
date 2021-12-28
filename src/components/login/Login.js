// Imports
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import base64 from 'base-64';
import { getUserData } from '../middleware/dataStore';

// Styles
import './Login.scss';
import { Button, FormLabel, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { fontFamily } from '@mui/system';

// Components

const useStyles = makeStyles({
  btn: {
<<<<<<< HEAD
    color: 'red'
=======
    color: 'red',
>>>>>>> cbc17d6be4bd31fb15d0267e28b9ae80ca83cd97
  },
});

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
  const classes = useStyles();

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
    <Paper>
      <Typography>
        <div id='login-div'>
          <form id="login-form" onSubmit={loginHandler}>
            <FormLabel id="label">Sign-In</FormLabel>
            <TextField required className="login-field" label="Username" name="username" style={{ margin: '10px' }} />
            <TextField required className="login-field" label="Password" type="password" name="password" style={{ margin: '10px' }} />
            <Button className={classes.btn} variant="outlined" type="submit">
              Submit
            </Button>
          </form>
          <div className='create-account-link'>
            <NavLink to="/signup">
              Create Account
              <AccountCircleIcon />
            </NavLink>
          </div>
        </div>
      </Typography>
    </Paper>
  );
});
