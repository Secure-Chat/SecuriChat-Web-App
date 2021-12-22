import React, {useState} from 'react';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';

const Theme = () => {

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
    </ThemeProvider>
  )
}

export default Theme;