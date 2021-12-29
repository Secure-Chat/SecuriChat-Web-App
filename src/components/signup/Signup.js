// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

//styling
import { Paper, Button, FormLabel, TextField, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Signup.scss';

const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const setPasswordIcon = showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check to make sure passwords match
    if (password === confirmPassword && password.length >= 8) {
      // const url = `${REACT_APP_DATABASE_URL}/signup`;
      // const request = {
      //   url,
      //   headers: {
      //     'Access-Control-Allow-Origin': null,
      //   },
      //   data: {
      //     username,
      //     password,
      //     rooms: []
      //   },
      // };

      axios({
        method: 'post',
        url: `${REACT_APP_DATABASE_URL}/signup`,
        headers: {
          'Access-Control-Allow-Origin': null,
        },
        data: {
          username,
          password,
          rooms: []
        }
      })
        .then((response) => {
          console.log(response.data, '<-- RESPONSE DOT DATA --<<');
          alert('Account Created!')
          setRedirect(true);
        })
        .catch((error) => {
          console.log(error, '<-- SIGN UP ERROR --<<');
          alert('Either email already exist or an error occured on our end. Please try again...');
        })
        .catch((error) => {
          console.log(error);
          alert('Either email already exist or an error occured on our end. Please try again...');
        });
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again...');
      } else {
        alert('Password needs to be at least 8 characters. Please try again...');
      }
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <Paper id="signup-div">
      <form onSubmit={handleSubmit}>
        <FormLabel id="signup-label">Sign-Up</FormLabel>
        <TextField required className="input-field" label="Username" onChange={handleUsername} />

        <TextField
          type={showPassword ? 'text' : 'password'}
          required
          label="Password"
          className="input-field"
          onChange={handlePassword}
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
        <TextField
          type={showPassword ? 'text' : 'password'}
          required
          label="Verify Password"
          className="input-field"
          onChange={handleConfirmPassword}
          onClick={handleShowPassword}
          onMouseDown={handleMouseDownPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} onMouseDown={handleMouseDownPassword}>{setPasswordIcon}</IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" id="btn" variant="contained">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Signup;
