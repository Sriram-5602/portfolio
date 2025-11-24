/*
 * Usage:
 * 1. npm install open node-fetch
 * 2. export SPOTIFY_CLIENT_ID=...
 * 3. export SPOTIFY_CLIENT_SECRET=...
 * 4. node get_refresh_token.js
 */

import http from 'http';
import open from 'open';
import fetch from 'node-fetch';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = 'http://127.0.0.1:8888/callback';

if (!clientId || !clientSecret) {
    console.error('Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars.');
    process.exit(1);
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/callback') {
        const code = url.searchParams.get('code');
        if (code) {
            res.end('Got code! Check your terminal.');

            // Exchange code for tokens
            const params = new URLSearchParams();
            params.append('grant_type', 'authorization_code');
            params.append('code', code);
            params.append('redirect_uri', redirectUri);

            try {
                const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params
                });

                const data = await tokenRes.json();
                console.log('\n=== YOUR REFRESH TOKEN ===\n');
                console.log(data.refresh_token);
                console.log('\n==========================\n');
                console.log('Add this to your .env file as SPOTIFY_REFRESH_TOKEN');

                server.close();
                process.exit(0);
            } catch (err) {
                console.error('Error exchanging token:', err);
            }
        }
    }
});

server.listen(8888, () => {
    const scope = 'user-read-currently-playing user-read-playback-state user-modify-playback-state';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&show_dialog=true`;

    console.log('Opening browser for authentication...');
    open(authUrl);
});
