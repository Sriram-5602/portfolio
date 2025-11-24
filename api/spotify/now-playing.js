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
    return res.json(); // returns access_token, expires_in
}

export default async function handler(req, res) {
    try {
        const tokenData = await getAccessToken();
        const accessToken = tokenData.access_token;

        // Now fetch currently playing
        const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (nowRes.status === 204) return res.json({ playing: false }); // nothing playing
        if (!nowRes.ok) {
            const txt = await nowRes.text();
            return res.status(nowRes.status).json({ error: txt });
        }

        const data = await nowRes.json();
        // Keep only the fields you need:
        const simplified = {
            playing: !data?.item ? false : true,
            timestamp: data.timestamp,
            progress_ms: data.progress_ms,
            is_playing: data.is_playing,
            item: {
                id: data.item?.id,
                name: data.item?.name,
                duration_ms: data.item?.duration_ms,
                artists: data.item?.artists?.map(a => ({ id: a.id, name: a.name })),
                album: {
                    id: data.item?.album?.id,
                    name: data.item?.album?.name,
                    images: data.item?.album?.images
                },
                external_urls: data.item?.external_urls
            }
        };

        // Cache for 5s - 30s depending on your preference
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
        res.status(200).json(simplified);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
