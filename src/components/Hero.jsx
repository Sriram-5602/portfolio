import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Download } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    const { name, title, bio, socials } = portfolioData.personalInfo;

    return (
        <section className="hero-section" id="about">
            <div className="container hero-content">
                <div className="hero-text">
                    <span className="hero-greeting">Hello, I'm</span>
                    <h1 className="hero-name">{name}</h1>
                    <h2 className="hero-title">{title}</h2>
                    <p className="hero-bio">{bio}</p>

                    <div className="hero-actions">
                        <a href="/cv.pdf" download className="btn btn-primary">
                            Download CV
                        </a>
                        <div className="social-links">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                >
                                    <social.icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="hero-stats">
                        <span>Build</span>
                        <span>Learn</span>
                        <span>Evolve</span>
                    </div>
                </div>

                <div className="hero-image-container">
                    <div className="hero-image">
                        <img src={portfolioData.personalInfo.profileImage} alt="Profile" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
