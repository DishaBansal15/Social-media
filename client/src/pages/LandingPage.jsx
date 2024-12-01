import React, { useState } from 'react';
import '../styles/landingpage.css';

import VibezoneLogo from '../images/vibe.jpg';
import About1 from '../images/goodvibes.jpg';
import About2 from '../images/about-1.jpg';

import Login from '../components/Login';
import Register from '../components/Register';

const LandingPage = () => {
    const [isLoginBox, setIsLoginBox] = useState(true);

    return (
        <div className="landingPage">
            <div className="landing-header">
                <span className="landing-header-logo">
                    <img src={VibezoneLogo} alt="VibeZone Logo" />
                </span>
                <ul>
                    <li className="header-li">
                        <a href="#home">Home</a>
                    </li>
                    <li className="header-li">
                        <a href="#about">About</a>
                    </li>
                    <li className="header-li">
                        <a href="#home">Join now</a>
                    </li>
                </ul>
            </div>

            <div className="landing-body">
                <div className="landing-hero" id="home">
                    <div className="landing-hero-content">
                        <h1>VibeZone</h1>
                        <p>
                            Welcome to VibeZone, a dynamic space where creativity, innovation, and connection come together. Whether you're exploring new ideas, sharing your passions, or building lasting relationships, VibeZone is where your digital journey begins.
                        </p>

                        <div className="authentication-form">
                            {isLoginBox ? (
                                <>
                                    <Login setIsLoginBox={setIsLoginBox} />
                                    <button
                                        style={{
                                            backgroundColor: '#f0f0f0',
                                            padding: '10px 20px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginTop: '10px',
                                        }}
                                        onClick={() => setIsLoginBox(false)}
                                    >
                                        Register
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Register setIsLoginBox={setIsLoginBox} />
                                    <button
                                        style={{
                                            backgroundColor: '#f0f0f0',
                                            padding: '10px 20px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginTop: '10px',
                                        }}
                                        onClick={() => setIsLoginBox(true)}
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="landing-hero-image">
                        <div id="landing-image-sidebar-left"></div>
                        <div className="back"></div>
                        <div id="landing-image-sidebar-right"></div>
                    </div>
                </div>

                <div className="landing-about" id="about">
                    <div className="about-1">
                        <img src={About1} className="about-1-img" alt="Good Vibes" />
                        <div className="about-1-content">
                            <h3>Stay Engaged, Stay Connected</h3>
                            <p>
                                VibeZone brings you closer to your friends, colleagues, and peers, no matter where they are. Stay updated with their latest posts, follow their journey, and be part of the conversations that matter. Share experiences, exchange ideas, and keep the vibe alive with your network.
                            </p>
                            <a href="#home">Join the VibeZone Community</a>
                        </div>
                    </div>
                    <div className="about-2">
                        <div className="about-2-content">
                            <h3>Unite, Share, and Inspire</h3>
                            <p>
                                VibeZone is more than just a platform—it's a community where you can connect, share, and inspire others. Whether you're a student, a professional, or an enthusiast in any field, VibeZone gives you the space to showcase your passions, exchange ideas, and build meaningful connections. Join the movement and be part of something special!
                            </p>
                            <a href="#home">Get Started with VibeZone</a>
                        </div>
                        <img src={About2} className="about-2-img" alt="About Us" />
                    </div>
                </div>

                <div className="footer">
                    <p>All rights reserved - &#169; VibeZone.com</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
