import React, { useState, useEffect } from 'react';
import { Github, GitCommit, GitPullRequest, Star, Plus, Loader, AlertCircle } from 'lucide-react';
import './GitHubActivity.css';

const GitHubActivity = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const username = "Sriram-5602";

    useEffect(() => {
        const fetchGitHubActivity = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/events?per_page=5`);

                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub activity');
                }

                const data = await response.json();
                setEvents(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching GitHub activity:", err);
                setError("Could not load GitHub activity");
                setLoading(false);
            }
        };

        fetchGitHubActivity();
    }, []);

    const getEventIcon = (type) => {
        switch (type) {
            case 'PushEvent': return <GitCommit size={16} className="activity-icon push-icon" />;
            case 'PullRequestEvent': return <GitPullRequest size={16} className="activity-icon pr-icon" />;
            case 'CreateEvent': return <Plus size={16} className="activity-icon create-icon" />;
            case 'WatchEvent': return <Star size={16} className="activity-icon star-icon" />;
            default: return <Github size={16} className="activity-icon" />;
        }
    };

    const getEventMessage = (event) => {
        switch (event.type) {
            case 'PushEvent':
                return `Pushed ${event.payload.size} commit${event.payload.size > 1 ? 's' : ''} to`;
            case 'PullRequestEvent':
                return `${event.payload.action} PR in`;
            case 'CreateEvent':
                return `Created ${event.payload.ref_type} in`;
            case 'WatchEvent':
                return "Starred";
            default:
                return "Activity in";
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    return (
        <div className="github-card">
            <div className="github-header">
                <h3><Github size={20} className="github-icon" /> Contributions</h3>
            </div>

            <div className="contribution-graph">
                <img
                    src={`https://ghchart.rshah.org/0984e3/${username}`}
                    alt="GitHub Contribution Graph"
                />
            </div>

            {loading ? (
                <div className="loading-state">
                    <Loader className="animate-spin" size={24} />
                    <span>Fetching updates...</span>
                </div>
            ) : error ? (
                <div className="error-state">
                    <AlertCircle size={24} />
                    <span>{error}</span>
                </div>
            ) : events.length === 0 ? (
                <div className="empty-state">
                    <span>No recent activity found</span>
                </div>
            ) : (
                <div className="activity-list">
                    {events.map((event) => (
                        <div key={event.id} className="activity-item">
                            {getEventIcon(event.type)}
                            <div className="activity-content">
                                <span>
                                    {getEventMessage(event)}{' '}
                                    <a
                                        href={`https://github.com/${event.repo.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="repo-name"
                                    >
                                        {event.repo.name.split('/')[1]}
                                    </a>
                                </span>
                                {event.type === 'PushEvent' && event.payload.commits && event.payload.commits[0] && (
                                    <span className="commit-msg">"{event.payload.commits[0].message}"</span>
                                )}
                                <span className="activity-time">{formatTime(event.created_at)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GitHubActivity;
