import React from "react";
import { NavLink, Link } from "react-router-dom";
import Settings from '../settings/Theme';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ContactsIcon from '@mui/icons-material/Contacts';
import LogoutIcon from '@mui/icons-material/Logout';
import {Paper, Typography} from '@mui/material'

const Navbar = (props) => {
  return (
    <Paper>
      <Typography>
    <nav className="navbar nav-bg">
      {/* <Settings/> */}
      <div className="container"><Link to="/"><span className="h3">SecuriChat<HomeIcon/></span></Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><NavLink className="nav-link"  to="/about">About<InfoIcon/></NavLink></li>
          </ul>
          {
            props.isLoggedIn ? // is the user logged in?
            <ul>
              <li className="nav-item"><NavLink className="nav-link"  to="/contacts"><ContactsIcon/></NavLink></li>
              <li className="nav-item"><NavLink className="nav-link"  to="/settings"><SettingsApplicationsIcon/></NavLink></li>
              <li className="nav-item"><span onClick={props.handleLogout} className="nav-link"><LogoutIcon/></span></li>
            </ul>
            :
            <ul>
              <li className="nav-item"><NavLink className="nav-link"  to="/signup">Create Account<AccountCircleIcon/></NavLink></li>
            </ul>
          }
      </div>
    </nav>
    </Typography>
    </Paper>
  );
}

export default Navbar;