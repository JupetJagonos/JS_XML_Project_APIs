Mood-Based Productivity App (SENSESSION)


Welcome to SENSESSION, a mood-based productivity application designed to enhance your focus and creativity 
by tailoring your environment with mood-specific images and curated playlists from Spotify, along with providing essential weather information.

Features

Spotify Integration: Log in with your Spotify account to access and play your playlists.
Image Search from Unsplash: Search for and display mood-specific background images to inspire your workspace.
Real-Time Weather Information: Get current weather updates for any specified city.
Pomodoro Timer: Utilize a Pomodoro timer to enhance productivity with work intervals and breaks.

Prerequisites

Node.js: Ensure you have Node.js installed (version 14 or above). You can download it from Node.js.
npm: Node Package Manager, which is included with Node.js.
Spotify Developer Account: Set up an application on the Spotify Developer Dashboard.
Unsplash API key: Obtain an API key from the Unsplash Developer.
OpenWeather API key: Get an API key from OpenWeatherMap.

API USED:


Usage
Access the App:
Open your web browser and navigate to http://localhost:3000.

Login with Spotify:
Click the "Login with Spotify" button to authenticate and access your playlists.

Search for Images:
Use the search box to input terms (e.g., "raining city vibe") to update the background.

Weather Information:
Check the weather conditions for a predefined city (default is Toronto).

Using the Pomodoro Timer:
Start the timer to help manage your work sessions effectively.

Additional Notes
Environment Variables: Do not share your .env file publicly as it contains sensitive information (API keys).
Rate Limits: Be aware of the API rate limits of Spotify, Unsplash, and OpenWeather, as excessive requests may lead to temporary bans.
