// Imports
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Routes, Route, BrowserRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import axios from 'axios';

import './App.css';
import LoginButton from './components/login/LoginButton';

// Components
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/Signup';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Settings from './components/settings/Settings';
import Login from './components/login/Login';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

// Components
import Login from './components/login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token;
    // If false: there is no token inside localStorage, then the user is not authenticated
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      // console.log('Token', token);
      setAuthToken(token);
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = userData => {
    setCurrentUser(userData);
    setIsAuthenticated(true); 
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');    // If there is a token, then remove it
      setCurrentUser(null);                   // Set the currentUser to null
      setIsAuthenticated(false)               // Set is auth to false
    }
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar isAuth={isAuthenticated} handleLogout={handleLogout} />
        {/* I thought we were making the login page the main page... We could do that and have an option for creating an account underneath// I was also thinking that we were making a menu in the header that would have settings and sign out in it */}
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div className='app-display'>
          <Routes>
            <Route path='/' element={<Login user={currentUser} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='signup/*' element={<Signup nowCurrentUser={nowCurrentUser} />} />
            <Route path='about/*' element={<About />} />
            <Route path='settings/*' element={<Settings user={currentUser}/>}  />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
