// Imports
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import base64 from 'base-64';

// Components

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signin: (response) => dispatch({ type: 'SIGN-IN', payload: response }),
});

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
  const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

  const loginHandler = (e) => {
    e.preventDefault();
    axios.post(`${REACT_APP_DATABASE_URL}/signin`, {}, {
      headers: {
        'Authorization': `Basic ${base64.encode(`${e.target.username.value}:${e.target.password.value}`)}`,
      }
    })
    .then(response => {
      props.signin(response);
      props.connect();
      
      // Needs socket connection and rooms... possibly in reducers but connected after this passes
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