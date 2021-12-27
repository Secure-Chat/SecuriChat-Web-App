import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Paper, Typography } from '@mui/material';

const About = () => {
  return (
    <Paper>
      <Typography>
        <div>
          <h1>We Are SecuriChat!</h1>
          <h2>Chat, Secured</h2>
          <h4>
            Privately, securely chat with your contacts, without worrying about your messages or private information
            being stored.
          </h4>
          <p>With SecuriChat you can: </p>
          <ul>
            <li>Do stuff</li>
            <li>And Things</li>
          </ul>
          <h3>The Team</h3>
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
