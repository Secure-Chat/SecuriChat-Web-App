// Imports
import { NavLink } from 'react-router-dom';

// styling
import { Paper, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import './Footer.scss';

export default function Footer() {
  return (
    <Paper id="footer" className="footer nav-bg--color">
      <Typography id="footer-container" className="container text-center">
        <span id="copyright">
          SecuriChat © 2022 the SecuriChat team, and contributors. It is available for use and modification under the{' '}
          <a href="https://github.com/Secure-Chat/securichat-web-app/blob/staging/LICENSE">MIT License</a>.
        </span>
        <NavLink id="about-link" to="/about">
          <InfoIcon />
        </NavLink>
      </Typography>
    </Paper>
  );
}
