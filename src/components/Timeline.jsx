import React from 'react';
import { portfolioData } from '../data/portfolio';
import Section from './Section';
import './Timeline.css';

const Timeline = () => {
    const { experience, education } = portfolioData;
    const [expandedTech, setExpandedTech] = React.useState({});

    const toggleTech = (index) => {
        setExpandedTech(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <Section id="experience" title="Experience & Education">
            <div className="timeline-container">
                <div className="timeline-section">
                    <h3 className="timeline-heading">Experience</h3>
                    <div className="timeline">
                        {experience.map((item, index) => {
                            const isExpanded = expandedTech[index];
                            const visibleTech = isExpanded ? item.techStack : item.techStack.slice(0, 5);
                            const remainingCount = item.techStack.length - 5;

                            return (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-header">
                                            <div className="role-company">
                                                <h4 className="timeline-title">{item.role}</h4>
                                                <span className="timeline-subtitle">{item.company}</span>
                                                {item.location && <span className="timeline-location">{item.location}</span>}
                                            </div>
                                            <span className="timeline-period">{item.period}</span>
                                        </div>

                                        <div className="timeline-body">
                                            {item.logo && (
                                                <div className="timeline-logo">
                                                    <img src={item.logo} alt={`${item.company} logo`} />
                                                </div>
                                            )}
                                            <p className="timeline-description">{item.description}</p>
                                        </div>

                                        {item.techStack && (
                                            <div className="timeline-tech">
                                                {visibleTech.map((tech, i) => (
                                                    <span key={i} className="tech-chip">{tech}</span>
                                                ))}
                                                {!isExpanded && remainingCount > 0 && (
                                                    <button
                                                        className="tech-chip more-chip"
                                                        onClick={() => toggleTech(index)}
                                                    >
                                                        +{remainingCount}
                                                    </button>
                                                )}
                                                {isExpanded && remainingCount > 0 && (
                                                    <button
                                                        className="tech-chip more-chip"
                                                        onClick={() => toggleTech(index)}
                                                    >
                                                        Show Less
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="timeline-section">
                    <h3 className="timeline-heading" id="education">Education</h3>
                    <div className="timeline">
                        {education.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <div className="role-company">
                                            <h4 className="timeline-title">{item.degree}</h4>
                                            <span className="timeline-subtitle">{item.school}</span>
                                        </div>
                                        <span className="timeline-period">{item.period}</span>
                                    </div>

                                    {item.coursework && (
                                        <div className="education-details">
                                            <span className="edu-label">Coursework:</span>
                                            <span className="edu-text">{item.coursework}</span>
                                        </div>
                                    )}

                                    {item.research && (
                                        <div className="education-details">
                                            <span className="edu-label">Research:</span>
                                            <span className="edu-text">{item.research}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Timeline;
