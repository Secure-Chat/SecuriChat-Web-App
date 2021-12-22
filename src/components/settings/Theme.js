import React, {useState} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';

const Theme = props => {

  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={changeTheme}>
      <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
    </ThemeProvider>
  )
}

export default Theme;