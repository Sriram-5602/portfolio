import React from 'react';
import { Github } from 'lucide-react';
import './GitHubActivity.css';

const GitHubContributions = () => {
    const username = "Sriram-5602";

    return (
        <div className="github-card contributions-card">
            <div className="github-header">
                <h3><Github size={20} className="github-icon" /> Contributions</h3>
            </div>

            <div className="contribution-graph">
                <img
                    src={`https://ghchart.rshah.org/0984e3/${username}`}
                    alt="GitHub Contribution Graph"
                />
            </div>
        </div>
    );
};

export default GitHubContributions;
