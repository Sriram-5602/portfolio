import React from 'react';
import { portfolioData } from '../data/portfolio';
import Section from './Section';
import Card from './Card';

const Projects = () => {
    const { projects } = portfolioData;

    return (
        <Section id="projects" title="Featured Projects">
            <div className="grid">
                {projects.map((project, index) => (
                    <Card
                        key={index}
                        title={project.title}
                        description={project.description}
                        tags={project.tech}
                        link={project.link}
                        image={project.image}
                    />
                ))}
            </div>
        </Section>
    );
};

export default Projects;
