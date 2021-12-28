// Imports
import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import base64 from "base-64";
import { getUserData } from "../middleware/dataStore";

// Styles
import "./Login.scss";
import { Button, FormLabel, Paper, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import { AccountCircleIcon, VisibilityIcon, VisibilityOffIcon } from '@mui/icons-material/';

// Components
const useStyles = makeStyles({
  btn: {
    color: "",
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
  signin: (response) => dispatch({ type: "SIGN_IN", payload: response }),
  setContacts: (payload) => dispatch({ type: "SET_CONTACTS", payload }),
  setMessageQueue: (payload) => dispatch({ type: "SET_MESSAGEQUEUE", payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const setPasswordIcon = showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />

  const classes = useStyles();

  // const socket = useContext(SocketContext);
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
        <div id="login-div">
          <form id="login-form" onSubmit={loginHandler}>
            <FormLabel id="label">Sign-In</FormLabel>
            <TextField
              required
              className="login-field"
              label="Username"
              name="username"
              style={{ margin: "10px" }}
            />
            <TextField
              required
              className="login-field"
              label="Password"
              name="password"
              style={{ margin: "10px" }}
              type={showPassword ? "text" : "password"}
              onClick={handleShowPassword}
              onMouseDown={handleMouseDownPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {setPasswordIcon}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button className={classes.btn} variant="outlined" type="submit">
              Submit
            </Button>
          </form>
          <div className="create-account-link">
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
