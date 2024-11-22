const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Spotify authentication strategy
passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: '/callback',
}, (accessToken, refreshToken, profile, done) => {
    return done(null, { profile, accessToken });
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', passport.authenticate('spotify', {
    scope: ['user-read-private', 'playlist-read-private'],
}));

app.get('/callback', passport.authenticate('spotify', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
    res.send(`
        <h1>Hello, ${req.user.profile.displayName}</h1>
        <a href="/logout">Logout</a>
        <div>
            <h2>Your Playlists</h2>
            <div id="playlists"></div>
            <script src="script.js"></script>
        </div>
    `);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/playlists', async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
    try {
        const response = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
            headers: { Authorization: `Bearer ${req.user.accessToken}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Spotify playlists:', error.response.data);
        res.status(500).send('Error accessing Spotify API');
    }
});

app.get('/test-unsplash/:mood', async (req, res) => {
    const mood = req.params.mood;
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/random`, {
            params: {
                query: mood,
                client_id: process.env.UNSPLASH_API_KEY,
                count: 3,
            },
        });
        res.json(response.data); // Return the image data as JSON
    } catch (error) {
        console.error('Unsplash API error:', error.response.data);
        res.status(500).send('Error accessing Unsplash API');
    }
});

app.get('/test-weather/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: process.env.WEATHER_API_KEY,
                units: 'metric',
            },
        });
        res.json(response.data); // Return the weather data as JSON
    } catch (error) {
        console.error('Weather API error:', error.response.data);
        res.status(500).send('Error accessing Weather API');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});