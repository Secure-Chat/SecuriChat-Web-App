// Imports
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import base64 from 'base-64';
import { getUserData } from '../middleware/dataStore';
import { FormControl, Button, Grid, Input } from '@mui/material';

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
  setMessageQueue: (payload) => dispatch({ type: 'SET_MESSAGEQUEUE', payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
  // const socket = useContext(SocketContext);
  const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
      setUsername(e.target.value);
  }

  const handlePassword = (e) => {
      setPassword(e.target.value);
  }

  const loginHandler = (e) => {
    e.preventDefault();
    const loginData = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    const loginString = `${loginData.username}:${loginData.password}`;
    axios.post(`${REACT_APP_DATABASE_URL}/signin`, {}, {
      headers: {
        'Authorization': `Basic ${base64.encode(loginString)}`
      }
    })
    .then(response => {
      console.log(response.data)
      const { userInfo } = response.data
      props.signin(userInfo);
      let userData = getUserData(userInfo);
      let { messageQueue, contactList } = userData;

      for (const friend of userInfo.friendsList) {
        console.log(friend)
        if (!(friend.friend.userInfo.username in contactList)) {
          contactList[friend.friend.userInfo.username] = {
            room: friend.room,
            messages: []
          }
        }
      }

      props.setMessageQueue(messageQueue);
      props.toggleLoggedIn()
    })
    .catch(error => console.log(error.message));
  };

  return (
    <>
      <form onSubmit={loginHandler}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={username} onChange={handleUsername} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary float-right">Submit</button>
      </form>
    </>
  );
});