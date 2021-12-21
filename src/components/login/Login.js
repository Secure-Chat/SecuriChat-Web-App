// Imports
import React from 'react';
import { connect } from 'react-redux';

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
  const DB_SERVER_URL = process.env.DB_SERVER_URL;

  const loginHandler = (e) => {
    e.preventDefault();
    axios.post(`${DB_SERVER_URL}/signin`, {}, {
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
