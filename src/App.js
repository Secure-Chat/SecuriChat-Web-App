// Imports
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Routes, Route, BrowserRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import axios from 'axios';
import { connect } from 'react-redux';

import './App.css';

// Components
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/Signup';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Settings from './components/settings/Settings';
import Login from './components/login/Login';
import Socket from './components/socket/Socket';
import Contacts from './components/contacts/Contacts';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(props.user.user) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [props.user.user])

  if (!isLoggedIn) {
    return (
      <>
        <h1>test header in app</h1>
        <BrowserRouter>
          <div className='App'>
            <Navbar />
            <div className='app-display'>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='signup/*' element={<Signup />} />
                <Route path='about/*' element={<About />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </>
    )
  }
  return (
    <>
      <Socket />
      <h1>test header in app</h1>
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <div className='app-display'>
            <Routes>
              <Route path='/' element={<Contacts />} /> 
              <Route path='about/*' element={<About />} />
              <Route path='settings/*' element={<Settings />}  />
              <Route path='contacts/*' element={<Contacts />}  />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
  }
}

export default connect(mapStateToProps)(App);


// // Imports
// import React from 'react';

// import './App.css';

// export default function App() {

//   return (
//     <>
// <p>hi</p>
//     </>
//   )
// }

