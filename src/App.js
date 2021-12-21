import React, { useState } from 'react';
import './App.css';
import LoginButton from './components/login/LoginButton';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <LoginButton
    isLoggedIn={isLoggedIn}
    setIsLoggedIn={setIsLoggedIn}/>
    </>
  )
}
