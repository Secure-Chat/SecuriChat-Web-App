import { NavLink } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navText: {
   float: 'right',
   textDecoration: 'none',
  //  color: '#fbab60'
  color: 'black'
  },
  sChat: {
  position: 'relative',
  marginLeft: '50%'
  }

})

export default function Footer() {
  const classes = useStyles();

  return (
    <Paper className="footer nav-bg--color">
      <Typography className="container text-center">
        <span className={classes.sChat}>SecuriChat © 2022</span>
        <NavLink className={classes.navText} to="/about">
          About
          <InfoIcon />
        </NavLink>
      </Typography>
    </Paper>
  );
}
