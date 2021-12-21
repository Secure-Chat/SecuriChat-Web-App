import React from 'react';
import { useState } from 'react';
import LoginButton from './LoginButton';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const loginUser = async credentials => {
  // return fetch('http://localhost:3000', {
  return fetch(`${REACT_APP_SERVER_URL}/signin/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginUser = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    //token?
  }

    return (
      <>
      <h1>Securichat</h1>
      <p>Login</p>
      <form onSubmit={handleLoginUser}>
        <label>
          <p>Username</p>
          <input type = "username" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type ="password" onChange={e => setPassword(e.target.value)}/>
        </label>
      <LoginButton/> 
      </form>
      </>
    )
  }

export default Login;
