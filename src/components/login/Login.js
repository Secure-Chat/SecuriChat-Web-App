// Imports
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import base64 from 'base-64';
import { getUserData } from '../middleware/dataStore';

// Components

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    messageQueue: state.messageQueue,
    socket: state.socket,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signin: (response) => dispatch({ type: 'SIGN_IN', payload: response }),
  setContacts: (payload) => dispatch({ type: 'SET_CONTACTS', payload }),
  setMessageQueue: (payload) => dispatch({ type: 'SET_MESSAGEQUEUE', payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
  const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

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
      const { userInfo } = response.data
      props.signin(userInfo);
      let userData = getUserData(userInfo);
      let { messageQueue, contactList } = userData;

      for (const friend of userInfo.friendsList) {
        if (!(friend.friend.userInfo.username in contactList)) {
          contactList[friend.friend.userInfo.username] = {
            room: friend.room,
            messages: []
          }
        }
      }

      props.setMessageQueue(messageQueue);
    })
    .catch(error => console.log(error.message));
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <label>
          <p>Username</p>
          <input type = "username" />
        </label>
        <label>
          <p>Password</p>
          <input type ="password" />
        </label>
        <button type='submit'>Log In</button>
      </form>
    </>
  );
});