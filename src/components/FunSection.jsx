import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Music } from 'lucide-react';
import Section from './Section';
import './FunSection.css';

import DeploymentStatus from './DeploymentStatus';
import MusicPlayer from './MusicPlayer';
import GitHubRecentActivity from './GitHubRecentActivity';
import GitHubContributions from './GitHubContributions';

const FunSection = () => {
    const { fun } = portfolioData;

    return (
        <Section id="labs" title="Labs">
            <div className="fun-grid">
                <DeploymentStatus />
                <MusicPlayer />
                <GitHubRecentActivity />
            </div>
            <div className="fun-full-width">
                <GitHubContributions />
            </div>
        </Section>
    );
};

export default FunSection;
