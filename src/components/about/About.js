import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Paper, Typography } from '@mui/material';

const About = () => {
  return (
    <Paper>
      <Typography>
        <div>
          <Typography variant="h3" align="center">We Are SecuriChat!</Typography>
          <Typography variant="h5" align="center">Chat, Secured</Typography>
          <Typography variant="subtitle1" align="center">
            Privately, securely chat with your contacts, without worrying about your messages or private information
            being stored.
          </Typography>
          <Typography variant="h5" align="center">The Team</Typography>
          <div className="teamContainer">
            <div className="teamCard">
              <p className="teamTitle">Evan Woodworth</p>
              <a href="https://linkedin.com/in/evan-woodworth">
                <LinkedInIcon />
              </a>
              <a href="https://github.com/evan-woodworth">
                <GitHubIcon />
              </a>
              <img src="/img/evan-profile-pic.jpeg" alt="profile" />
            </div>
            <div className="teamCard">
              <p className="teamTitle">Cameron Walden</p>
              <a href="https://www.linkedin.com/in/cameronwalden/">
                <LinkedInIcon />
              </a>
              <a href="https://github.com/Cameron-Walden">
                <GitHubIcon />
              </a>
              <img src="/img/cameron-profile-pic.jpeg" alt="profile" />
            </div>
            <div className="teamCard">
              <p className="teamTitle">Antoine Charette</p>
              <a href="https://www.linkedin.com/in/antoinecharette/">
                <LinkedInIcon />
              </a>
              <a href="https://github.com/DevAOC">
                <GitHubIcon />
              </a>
              <img src="/img/antoine.jpeg" alt="profile" />
            </div>
            <div className="teamCard">
              <p className="teamTitle">George Mead</p>
              <a href="https://www.linkedin.com/in/george-mead/">
                <LinkedInIcon />
              </a>
              <a href="https://github.com/gmeadiv">
                <GitHubIcon />
              </a>
              <img src="/img/George-Mead-Profile-Pic.jpeg" alt="profile" />
            </div>
          </div>
        </div>
      </Typography>
    </Paper>
  );
};

export default About;
