// Imports
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { socket, SocketContext } from './context/socket';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import './App.scss';

// Components
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/Signup';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Contacts from './components/contacts/Contacts';
import AddFriend from './components/addFriend/AddFriend';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chooseIconMode = darkMode ? <Brightness4Icon /> : <Brightness5Icon />;

  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn)
  };

  const changeTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <SocketContext.Provider value={socket}>
      <ThemeProvider theme={changeTheme}>
        <CssBaseline />
        <div className="App">
          <Router>
            <Navbar
              chooseIconMode={chooseIconMode}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isLoggedIn={isLoggedIn}
            />
            <div id="app-display">
              <Routes>
                {isLoggedIn ? (
                  <>
                    <Route path="/" element={<Contacts />} />
                    {/* <Route path="addfriend/*" element={<AddFriend />} /> */}
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Login toggleLoggedIn={toggleLoggedIn} />} />
                    <Route path="signup/*" element={<Signup />} />
                  </>
                )}
                <Route path="about/*" element={<About />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </div>
      </ThemeProvider>
    </SocketContext.Provider>
  );
}

export default App;
