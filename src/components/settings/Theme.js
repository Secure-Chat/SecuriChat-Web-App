import React, {useState} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, Paper, Switch, Typography } from '@mui/material';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness5Icon from '@mui/icons-material/Brightness5';

const Theme = props => {
  
  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    },
  })

  return (
    <ThemeProvider theme={changeTheme}>
      <CssBaseline/>
      <Paper>
      <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
      {/* <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Brightness4Icon/> :  <Brightness5Icon/>}
      </IconButton> */}
      <Typography variant="h1" >
        {darkMode ? <p class="dark">Dark</p> : <p class="light">Light</p>}
      </Typography>
      </Paper>
    </ThemeProvider>
  )
}

export default Theme;