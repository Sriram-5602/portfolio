import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [track, setTrack] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchNowPlaying = async () => {
        try {
            const response = await fetch('/api/spotify/now-playing');

            if (!response.ok) {
                // If 401/403, might need re-auth, but we'll just show offline for now
                throw new Error('Failed to fetch music status');
            }

            const song = await response.json();

            if (song.playing && song.item) {
                setTrack({
                    title: song.item.name,
                    artist: song.item.artists.map((_artist) => _artist.name).join(', '),
                    albumArt: song.item.album.images[0].url,
                    isPlaying: song.is_playing
                });
                setIsPlaying(song.is_playing);
            } else {
                setIsPlaying(false);
            }
            setLoading(false);
        } catch (e) {
            console.error("Error fetching Spotify data", e);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const handleControl = async (action) => {
        // Optimistic update
        if (action === 'play') setIsPlaying(true);
        if (action === 'pause') setIsPlaying(false);

        try {
            await fetch('/api/spotify/control', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action }),
            });

            // Refresh state after a short delay to allow Spotify to update
            setTimeout(fetchNowPlaying, 500);
        } catch (error) {
            console.error("Control error:", error);
        }
    };

    if (loading) {
        return (
            <div className="music-player-card">
                <div className="music-content">
                    <div className="music-header">
                        <h3>Now Playing</h3>
                        <FaSpotify size={20} className="spotify-icon" />
                    </div>
                    <div className="not-playing">
                        <span>Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!track) {
        return (
            <div className="music-player-card">
                <div className="music-player-bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}></div>
                <div className="music-content">
                    <div className="music-header">
                        <h3>Now Playing</h3>
                        <FaSpotify size={20} className="spotify-icon" />
                    </div>
                    <div className="not-playing">
                        <Music size={40} className="offline-icon" />
                        <span>Not playing anything right now</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Spotify Offline</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="music-player-card">
            <div className="music-player-bg" style={{ backgroundImage: `url(${track.albumArt})` }}></div>

            <div className="music-content">
                <div className="music-header">
                    <h3>Now Playing</h3>
                    <FaSpotify size={20} className="spotify-icon" />
                </div>

                <div className="track-info">
                    <div className="album-art">
                        <img src={track.albumArt} alt="Album Art" />
                    </div>
                    <div className="track-details">
                        <span className="track-title">{track.title}</span>
                        <span className="track-artist">{track.artist}</span>
                    </div>
                </div>

                {/* Visualizer */}
                <div className={`visualizer-container ${isPlaying ? '' : 'paused'}`}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                <div className="player-controls">
                    <button className="control-btn" onClick={() => handleControl('prev')}>
                        <SkipBack size={24} fill="currentColor" />
                    </button>
                    <button className="control-btn play-btn" onClick={() => handleControl(isPlaying ? 'pause' : 'play')}>
                        {isPlaying ? (
                            <Pause size={28} fill="currentColor" />
                        ) : (
                            <Play size={28} fill="currentColor" />
                        )}
                    </button>
                    <button className="control-btn" onClick={() => handleControl('next')}>
                        <SkipForward size={24} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
