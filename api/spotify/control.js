import fetch from 'node-fetch';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });
    if (!res.ok) throw new Error('Failed to refresh token: ' + res.status);
    return res.json();
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { action } = req.body; // 'play', 'pause', 'next', 'prev'

    if (!action) {
        return res.status(400).json({ error: 'Missing action' });
    }

    try {
        const tokenData = await getAccessToken();
        const accessToken = tokenData.access_token;

        let endpoint = '';
        let method = 'POST';

        switch (action) {
            case 'play':
                endpoint = 'https://api.spotify.com/v1/me/player/play';
                method = 'PUT';
                break;
            case 'pause':
                endpoint = 'https://api.spotify.com/v1/me/player/pause';
                method = 'PUT';
                break;
            case 'next':
                endpoint = 'https://api.spotify.com/v1/me/player/next';
                break;
            case 'prev':
                endpoint = 'https://api.spotify.com/v1/me/player/previous';
                break;
            default:
                return res.status(400).json({ error: 'Invalid action' });
        }

        const spotifyRes = await fetch(endpoint, {
            method: method,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (spotifyRes.status === 204) {
            return res.status(200).json({ success: true });
        }

        // If error, try to get text
        if (!spotifyRes.ok) {
            const errorData = await spotifyRes.json();
            console.error('Spotify Control Error:', JSON.stringify(errorData, null, 2));
            return res.status(spotifyRes.status).json(errorData);
        }

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
