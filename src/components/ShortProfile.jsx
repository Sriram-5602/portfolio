import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Code, Globe, User, Briefcase, Heart, Coffee } from 'lucide-react';
import Section from './Section';
import './ShortProfile.css';

const ShortProfile = () => {
    const { shortProfile } = portfolioData;

    return (
        <Section id="profile" title={shortProfile.heading}>
            <div className="bento-grid">
                {/* Main Description Card */}
                <div className="bento-card large-card description-card">
                    <div className="card-header">
                        <User size={24} />
                        <h3>Personal Summary</h3>
                    </div>
                    <p>{shortProfile.description}</p>
                </div>

                {/* Tech Stack Card */}
                <div className="bento-card tech-card">
                    <div className="card-header">
                        <Code size={24} />
                        <h3>Tech Stack</h3>
                    </div>
                    <div className="tags-container">
                        {shortProfile.techStack.map((tech, index) => (
                            <span key={index} className="tech-chip">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Languages Card */}
                <div className="bento-card lang-card">
                    <div className="card-header">
                        <Globe size={24} />
                        <h3>Languages</h3>
                    </div>
                    <p>{shortProfile.languages}</p>
                </div>

                {/* Current Role Card */}
                <div className="bento-card role-card">
                    <div className="card-header">
                        <Briefcase size={24} />
                        <h3>Current Role</h3>
                    </div>
                    <div className="role-content">
                        <h4>{shortProfile.currentRole.title}</h4>
                        <span className="role-company-name">@ {shortProfile.currentRole.company}</span>
                        <p>{shortProfile.currentRole.description}</p>
                    </div>
                </div>

                {/* Hobbies Card */}
                <div className="bento-card hobbies-card">
                    <div className="card-header">
                        <Heart size={24} />
                        <h3>Hobbies</h3>
                    </div>
                    <div className="tags-container">
                        {shortProfile.hobbies.map((hobby, index) => (
                            <span key={index} className="hobby-tag">{hobby}</span>
                        ))}
                    </div>
                </div>

                {/* Quick Facts Card */}
                <div className="bento-card facts-card">
                    <div className="card-header">
                        <Coffee size={24} />
                        <h3>Quick Facts</h3>
                    </div>
                    <ul className="facts-list">
                        {shortProfile.quickFacts.map((fact, index) => (
                            <li key={index}>{fact}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
};

export default ShortProfile;
