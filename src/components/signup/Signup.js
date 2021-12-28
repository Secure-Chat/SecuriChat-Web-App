// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { Paper, Typography, Button, FormLabel, TextField} from '@mui/material';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = e => {
    setPassword(e.target.value);
  }

  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check to make sure passwords match
    if (password === confirmPassword && password.length >= 8) {
      let url = `${REACT_APP_SERVER_URL}/signup`;
      const request = {
        url,
        headers: {
          'Access-Control-Allow-Origin': null
        },
        data: {
          username,
          email,
          password
        }
      };

      axios(request)
        .then(response => {
        console.log(response.data, '<-- RESPONSE DOT DATA --<<');
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token)
        const decoded = jwt_decode(token);  // Decode token to get the user data
        props.nowCurrentUser(decoded);      // Set current user
        setRedirect(true);
        }).catch(error => {
        console.log(error, '<-- SIGN UP ERROR --<<');
        alert('Either email already exist or an error occured on our end. Please try again...');
        })
    } else {
      if (!password === confirmPassword) {
        alert('Passwords do not match. Please try again...');
      } else {
        alert('Password needs to be at least 8 characters. Please try again...');
      }
    }
  }

  if (redirect) return <Navigate to='/contacts' />
  
  return (
    <Paper>
          <Typography>Signup</Typography>
          <FormLabel onSubmit={handleSubmit}>
              <TextField label="username" onChange={handleUsername}/>
              <TextField label="email" onChange={handleEmail}/>
              <TextField label="password" onChange={handlePassword}/>
              <TextField label="verify password" onChange={handleConfirmPassword}/>
            <Button type="submit" className="btn btn-primary float-right">Submit</Button>
          </FormLabel>
    </Paper>
  )
}

export default Signup;