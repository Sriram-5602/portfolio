import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import {
    FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaFigma, FaDatabase, FaTools, FaJava
} from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiRedux, SiPostgresql, SiFirebase, SiTypescript, SiExpress, SiMongodb, SiVercel, SiMysql, SiRedis, SiMercurial } from 'react-icons/si';
import Section from './Section';
import './Skills.css';

// Icon mapping helper (reused or imported if possible, but keeping local for simplicity)
const getSkillIcon = (skillName) => {
    const name = skillName.toLowerCase();
    if (name.includes('react')) return <FaReact />;
    if (name.includes('next')) return <SiNextdotjs />;
    if (name.includes('node')) return <FaNodeJs />;
    if (name.includes('js') || name.includes('javascript')) return <FaJs />;
    if (name.includes('html')) return <FaHtml5 />;
    if (name.includes('css')) return <FaCss3Alt />;
    if (name.includes('tailwind')) return <SiTailwindcss />;
    if (name.includes('redux')) return <SiRedux />;
    if (name.includes('firebase')) return <SiFirebase />;
    if (name.includes('postgres')) return <SiPostgresql />;
    if (name.includes('mongo')) return <SiMongodb />;
    if (name.includes('python')) return <FaPython />;
    if (name.includes('git')) return <FaGitAlt />;
    if (name.includes('docker')) return <FaDocker />;
    if (name.includes('aws')) return <FaAws />;
    if (name.includes('figma')) return <FaFigma />;
    if (name.includes('type')) return <SiTypescript />;
    if (name.includes('express')) return <SiExpress />;
    if (name.includes('java')) return <FaJava />;
    if (name.includes('vercel')) return <SiVercel />;
    if (name.includes('mysql')) return <SiMysql />;
    if (name.includes('redis')) return <SiRedis />;
    if (name.includes('mercurial') || name.includes('hg')) return <SiMercurial />;
    return <FaTools />; // Default icon
};

const Skills = () => {
    const { skills } = portfolioData;
    const categories = Object.keys(skills);
    const [activeTab, setActiveTab] = useState(categories[0]);

    return (
        <Section id="skills" title="Skills">
            <div className="skills-tabs">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`tab-btn ${activeTab === category ? 'active' : ''}`}
                        onClick={() => setActiveTab(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            <div className="skills-content">
                <div className="skills-grid">
                    {skills[activeTab].map((skill, index) => (
                        <div key={index} className="skill-card-interactive">
                            <div className="skill-front">
                                <div className="skill-icon">{getSkillIcon(skill.name)}</div>
                                <span className="skill-name">{skill.name}</span>
                            </div>
                            <div className="skill-back">
                                <span className="skill-level-text">{skill.level}%</span>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Skills;
