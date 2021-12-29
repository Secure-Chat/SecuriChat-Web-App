import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, Paper, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness5Icon from '@mui/icons-material/Brightness5';

const Theme = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const chooseIconMode = darkMode ? <Brightness4Icon /> : <Brightness5Icon />;

  const changeTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={changeTheme}>
      <CssBaseline />
      <Paper>
        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {chooseIconMode}
        </IconButton>
      </Paper>
    </ThemeProvider>
  );
};

export default Theme;
