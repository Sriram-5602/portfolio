import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { Award, ExternalLink } from 'lucide-react';
import Section from './Section';
import './Certifications.css';

const Certifications = () => {
    const { certifications } = portfolioData;

    return (
        <Section id="certifications" title="Certifications">
            <div className="cert-grid">
                {certifications.map((cert, index) => (
                    <a
                        key={index}
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-card"
                    >
                        {/* <div className="cert-icon-wrapper">
                            <Award size={32} />
                        </div> */}
                        <div className="cert-content">
                            <h3>{cert.title}</h3>
                            <p className="cert-issuer">{cert.issuer}</p>
                            <span className="cert-date">{cert.date}</span>
                        </div>
                        <div className="cert-overlay">
                            <span className="view-btn">
                                View Credential <ExternalLink size={16} />
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
};

export default Certifications;
