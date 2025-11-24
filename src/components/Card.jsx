import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
    FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaFigma
} from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiRedux, SiPostgresql, SiFirebase, SiTypescript, SiExpress } from 'react-icons/si';
import './Card.css';

// Icon mapping helper
const getIcon = (techName) => {
    const name = techName.toLowerCase();
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
    if (name.includes('python')) return <FaPython />;
    if (name.includes('git')) return <FaGitAlt />;
    if (name.includes('docker')) return <FaDocker />;
    if (name.includes('aws')) return <FaAws />;
    if (name.includes('figma')) return <FaFigma />;
    if (name.includes('type')) return <SiTypescript />;
    if (name.includes('express')) return <SiExpress />;
    return null;
};

const Card = ({ title, subtitle, description, tags, link, image, type = 'default' }) => {
    return (
        <div className="card">
            {image && (
                <div className="card-image">
                    <img src={image} alt={title} />
                </div>
            )}
            <div className="card-content">
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                    {link && (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
                {subtitle && <h4 className="card-subtitle">{subtitle}</h4>}
                <p className="card-description">{description}</p>

                {tags && (
                    <div className="card-tags">
                        {tags.map((tag, index) => {
                            const Icon = getIcon(tag);
                            return (
                                <span key={index} className="tag-icon" title={tag}>
                                    {Icon ? Icon : tag}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
