import React, { useState } from 'react';

 const LoginButton = props => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
      {isLoggedIn ?
      'Logout'
    : 'Login'}
      </button>
  )
}

export default LoginButton;