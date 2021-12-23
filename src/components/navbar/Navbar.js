import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar nav-bg">
      <div className="container"><Link to="/"><span className="h3">SecuriChat</span></Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><NavLink className="nav-link"  to="/about">About</NavLink></li>
          </ul>
          {
            props.isLoggedIn ? // is the user logged in?
            <ul>
              <li className="nav-item"><NavLink className="nav-link"  to="/contacts">Contacts</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link"  to="/settings">Settings</NavLink></li>
              <li className="nav-item"><span onClick={props.handleLogout} className="nav-link">Logout</span></li>
            </ul>
            :
            <ul>
              <li className="nav-item"><NavLink className="nav-link"  to="/signup">Create Account</NavLink></li>
            </ul>
          }
      </div>
    </nav>
  );
}

export default Navbar;