import React from 'react';

const About = () => {
    return (
        <div>
            <h1>We Are SecuriChat!</h1>
            <h2>Chat, Secured</h2>
            <h4>Privately, securely chat with your contacts, without worrying about your messages or private information being stored.</h4>
            <p>With SecuriChat you can: </p>
            <ul>
                <li>Do stuff</li>
                <li>And Things</li>
            </ul>
            <h3>The Team</h3>
            <div className="teamContainer">
                <div className="teamCard">
                        <p className="teamTitle">Evan Woodworth</p>
                        <a href="https://linkedin.com/in/evan-woodworth">LinkedIn</a>
                        <img src="/img/evan-profile-pic.jpeg" alt="profile picture" />
                </div>
                <div className="teamCard">
                        <p className="teamTitle">Cameron Walden</p>
                        <a href="">LinkedIn</a>
                        <img src="" alt="profile picture" />
                </div>
                <div className="teamCard">
                        <p className="teamTitle">Antoine Charette</p>
                        <a href="https://www.linkedin.com/in/antoinecharette/">LinkedIn</a>
                        <img src="../../image/antoine.jpeg" alt="profile picture" />
                </div>
                <div className="teamCard">
                        <p className="teamTitle">George Mead</p>
                        <a href="">LinkedIn</a>
                        <img src="" alt="profile picture" />
                </div>
            </div>

        </div>
    )
}

export default About;