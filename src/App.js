// Imports
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { socket, SocketContext } from './context/socket';

import './App.css';

// Components
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/Signup';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Settings from './components/settings/Settings';
import Login from './components/login/Login';
// import Socket from './components/socket/Socket';
import Contacts from './components/contacts/Contacts';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoggedIn = () => {
    if (isLoggedIn) setIsLoggedIn(false);
    else setIsLoggedIn(true);
  }

    return (
      <SocketContext.Provider value={socket}>
        <h1>test header in app</h1>
          <div className='App'>
          <Router>
            <Navbar isLoggedIn={isLoggedIn}/>
            <div className='app-display'>
              <Routes>
                { isLoggedIn ? 
                  <>
                    <Route path='/' element={<Contacts />} />
                    <Route path='settings/*' element={<Settings />}  />
                    <Route path='contacts/*' element={<Contacts />}  />
                  </> :
                  <>
                    <Route path='/' element={<Login toggleLoggedIn={toggleLoggedIn} />} />
                    <Route path='signup/*' element={<Signup />} />
                  </>
                }
                <Route path='about/*' element={<About />} />
              </Routes>
            </div>
            <Footer />
            </Router>
          </div>
      </SocketContext.Provider>
    )
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
  }
}

export default connect(mapStateToProps)(App);