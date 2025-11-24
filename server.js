import express from 'express';
import 'dotenv/config'; // Automatically loads .env
import nowPlayingHandler from './api/spotify/now-playing.js';
import controlHandler from './api/spotify/control.js';

const app = express();
const PORT = 3001;

// Debug: Check if env vars are loaded (print first 4 chars only)
console.log('Spotify Config Check:');
console.log('Client ID:', process.env.SPOTIFY_CLIENT_ID ? 'Loaded' : 'Missing');
console.log('Client Secret:', process.env.SPOTIFY_CLIENT_SECRET ? 'Loaded' : 'Missing');
console.log('Refresh Token:', process.env.SPOTIFY_REFRESH_TOKEN ? 'Loaded' : 'Missing');

app.get('/api/spotify/now-playing', async (req, res) => {
    try {
        await nowPlayingHandler(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(express.json()); // Need json body parser for POST
app.post('/api/spotify/control', async (req, res) => {
    try {
        await controlHandler(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Local API server running at http://localhost:${PORT}`);
});
