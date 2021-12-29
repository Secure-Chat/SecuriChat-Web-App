// import React from 'react';
// import { NavLink, Link } from 'react-router-dom';

// // mui
// import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
// import ContactsIcon from '@mui/icons-material/Contacts';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { IconButton, Paper, Typography } from '@mui/material';
// import logo from '../../img/logo.png';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//   logo: {
//     height: '100px',
//   },
// });

// const Navbar = (props) => {
//   const classes = useStyles();

//   return props.isLoggedIn ? (
//     <Paper>
//       <Typography>
//         <nav className="navbar nav-bg">
//           <div className="container">
//             <Link to="/">
//               <img src={logo} alt="SecuriChat" className={classes.logo} />
//             </Link>
//             <ul>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/contacts">
//                   <ContactsIcon />
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/settings">
//                   <SettingsApplicationsIcon />
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <span onClick={props.handleLogout} className="nav-link">
//                   <LogoutIcon />
//                 </span>
//               </li>
//             </ul>
//             <IconButton color="inherit" onClick={() => props.setDarkMode(!props.darkMode)}>
//               {props.chooseIconMode}
//             </IconButton>
//           </div>
//         </nav>
//       </Typography>
//     </Paper>
//   ) : (
//     <Paper>
//       <Typography>
//         <nav className="navbar nav-bg">
//           <div className="container">
//             <Link to="/">
//               <img src={logo} alt="SecuriChat" className={classes.logo} />
//             </Link>
//             <IconButton color="inherit" onClick={() => props.setDarkMode(!props.darkMode)}>
//               {props.chooseIconMode}
//             </IconButton>
//           </div>
//         </nav>
//       </Typography>
//     </Paper>
//   );
// };

// export default Navbar;



import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../img/logo.png';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  logo: {
    height: '100px',
  },
});

const pages = ['Contacts', 'Settings', 'About'];
const links = {
  'Contacts': '/',
  'Settings': '/settings',
  'About': '/about'
}

const NavBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const classes = useStyles();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={logo} alt="SecuriChat" className={classes.logo} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={links[page]} className="nav-link-dropdown">{page}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo} alt="SecuriChat" className={classes.logo} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={links[page]} className="nav-link">{page}</Link>
              </Button>
            ))}
          </Box>
          <Button color="inherit">
            {props.isLoggedIn ? 
            <></> :
            <Link to='/Login' className="nav-link">Login</Link>}
          </Button>
          <IconButton color="inherit" onClick={() => props.setDarkMode(!props.darkMode)}>
            {props.chooseIconMode}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;