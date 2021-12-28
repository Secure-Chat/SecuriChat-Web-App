import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// mui
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ContactsIcon from '@mui/icons-material/Contacts';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Paper, Typography } from '@mui/material';
import logo from '../../img/logo.png';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  logo:{
    height: '100px',
  },
  createAccount: {
    float: 'right',
    textDecoration: 'none',
    color: 'black',
    position: 'relative',
    bottom: '120px'
  }
})

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <Paper>
      <Typography>
        <nav className="navbar nav-bg">
          <div className="container">
            <Link to="/">
              <img src={logo} alt="SecuriChat" className={classes.logo} />
            </Link>
            {props.isLoggedIn ? (
              <ul>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <ContactsIcon />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/settings">
                    <SettingsApplicationsIcon />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span onClick={props.handleLogout} className="nav-link">
                    <LogoutIcon />
                  </span>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="nav-item">
                  <NavLink className={classes.createAccount}to="/signup">
                    Create Account
                    <AccountCircleIcon />
                  </NavLink>
                </li>
              </ul>
            )}
            <IconButton color="inherit" onClick={() => props.setDarkMode(!props.darkMode)}>
              {props.chooseIconMode}
            </IconButton>
          </div>
        </nav>
      </Typography>
    </Paper>
  );
};

export default Navbar;
