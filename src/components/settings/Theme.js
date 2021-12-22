import React, { useState} from 'react';

export const ThemeContext = React.createContext();

const Theme = props => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    if(theme === 'dark'){
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <ThemeContext.Provider value ={{theme, toggleTheme}}>
      {props.children}
      </ThemeContext.Provider>
  )
}

export default Theme;