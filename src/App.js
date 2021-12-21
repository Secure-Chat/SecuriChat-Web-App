// Imports
import React, { useEffect, useState } from 'react';
import './App.css';

// Components
import Login from './components/login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

export default function App() {
  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
}
