import React, { useState, useEffect } from 'react';
import { Rocket, AlertCircle, Loader } from 'lucide-react';
import './DeploymentStatus.css';

const DeploymentStatus = () => {
    const [deployments, setDeployments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Vercel API Token - In a real app, this should be in .env
    // For this portfolio, we'll use a placeholder or public read-only token if available
    // User needs to replace this
    const VERCEL_TOKEN = import.meta.env.VITE_VERCEL_TOKEN;

    useEffect(() => {
        const fetchDeployments = async () => {
            if (!VERCEL_TOKEN) {
                // Mock data if no token is provided
                setDeployments([
                    { name: "portfolio-v2", state: "READY", created: Date.now() },
                    { name: "ecommerce-api", state: "BUILDING", created: Date.now() },
                    { name: "task-manager", state: "ERROR", created: Date.now() },
                    { name: "blog-cms", state: "READY", created: Date.now() }
                ]);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://api.vercel.com/v6/deployments?limit=5', {
                    headers: {
                        Authorization: `Bearer ${VERCEL_TOKEN}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch deployments');
                }

                const data = await response.json();
                setDeployments(data.deployments);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching deployments:", err);
                setError("Could not load deployment status");
                setLoading(false);
            }
        };

        fetchDeployments();

        // Poll every 30 seconds
        const interval = setInterval(fetchDeployments, 30000);
        return () => clearInterval(interval);
    }, [VERCEL_TOKEN]);

    const getStatusClass = (state) => {
        switch (state.toUpperCase()) {
            case 'READY': return 'status-ready';
            case 'BUILDING': return 'status-building';
            case 'ERROR': return 'status-error';
            case 'CANCELED': return 'status-canceled';
            default: return 'status-canceled';
        }
    };

    const getStatusLabel = (state) => {
        switch (state.toUpperCase()) {
            case 'READY': return 'Live';
            case 'BUILDING': return 'Deploying';
            case 'ERROR': return 'Failed';
            case 'CANCELED': return 'Canceled';
            default: return state;
        }
    };

    return (
        <div className="deployment-card">
            <div className="deployment-header">
                <h3><Rocket size={20} className="rocket-icon" /> Deployment Status</h3>
            </div>

            {loading ? (
                <div className="loading-state">
                    <Loader className="animate-spin" size={24} />
                    <span>Fetching latest status...</span>
                </div>
            ) : error ? (
                <div className="error-state">
                    <AlertCircle size={24} />
                    <span>{error}</span>
                    {!VERCEL_TOKEN && <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Add VITE_VERCEL_TOKEN to .env</span>}
                </div>
            ) : (
                <div className="deployment-list">
                    {deployments.length === 0 ? (
                        <div className="empty-state">
                            <span>No deployments yet</span>
                        </div>
                    ) : (
                        deployments.map((deploy, index) => (
                            <div key={index} className="deployment-item">
                                <span className="project-name">{deploy.name}</span>
                                <span className={`status-badge ${getStatusClass(deploy.state)}`}>
                                    {getStatusLabel(deploy.state)}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default DeploymentStatus;
