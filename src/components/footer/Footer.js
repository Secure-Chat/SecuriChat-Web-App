import { NavLink } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function Footer() {
  return (
    <Paper className="footer nav-bg--color">
      <Typography className="container text-center">
        <span className="text-muted">SecuriChat © 2022</span>
        <NavLink className="nav-link" to="/about">
          About
          <InfoIcon />
        </NavLink>
      </Typography>
    </Paper>
  );
}
