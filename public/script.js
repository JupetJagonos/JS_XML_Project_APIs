document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const timerDisplay = document.getElementById('timer-display');

    // Timer functionality
    startButton.addEventListener('click', () => {
        let minutes = 25;
        let seconds = 0;

        clearInterval(window.timer); // Clear any existing timer

        window.timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(window.timer);
                    alert('Time is up!');
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }

            // Update Timer Display
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000); // Update every second
    });

    // Fetch and display weather data
    const fetchWeatherData = () => {
        const city = 'New York'; // Change to desired city or input from user
        fetch(`/test-weather/${city}`)
            .then(response => response.json())
            .then(data => {
                const weatherInfo = `
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Conditions: ${data.weather[0].description}</p>
                `;
                document.getElementById('weather-info').innerHTML = weatherInfo;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather-info').innerHTML = 'Could not fetch weather information.';
            });
    };

    // Fetch Spotify playlists
    const fetchSpotifyPlaylists = async () => {
        try {
            const response = await fetch('/playlists', { credentials: 'include' });
            const data = await response.json();
            const playlistsContainer = document.getElementById('playlists');
            playlistsContainer.innerHTML = ''; // Clear previous results

            data.items.forEach(playlist => {
                const playlistElement = document.createElement('div');
                playlistElement.innerHTML = `
                    <h3>${playlist.name}</h3>
                    <a href="${playlist.external_urls.spotify}" target="_blank">Open Playlist</a>
                `;
                playlistsContainer.appendChild(playlistElement);
            });
        } catch (error) {
            console.error('Error fetching playlists:', error);
            alert('Could not fetch playlists. Please try again later.');
        }
    };

    // Call functions on load
    fetchWeatherData();
    // If user is authenticated, you might call fetchSpotifyPlaylists(); based on user actions
});