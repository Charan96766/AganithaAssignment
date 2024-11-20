import React, { useState } from "react"; // Importing React and the useState hook for managing state
import axios from "axios"; // Importing axios for making HTTP requests
import "../Components/Weather.css"; // Importing CSS for styling
import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiSprinkle,
} from "react-icons/wi"; // Importing weather icons from the react-icons library

// Mapping weather codes to their descriptions and icons
const weatherDescriptions = {
  0: { description: "Clear Sky", icon: <WiDaySunny /> },
  1: { description: "Mainly Clear", icon: <WiDaySunny /> },
  2: { description: "Partly Cloudy", icon: <WiCloud /> },
  3: { description: "Overcast", icon: <WiCloudy /> },
  45: { description: "Foggy", icon: <WiFog /> },
  48: { description: "Rime Fog", icon: <WiFog /> },
  51: { description: "Light Drizzle", icon: <WiSprinkle /> },
  53: { description: "Moderate Drizzle", icon: <WiSprinkle /> },
  55: { description: "Dense Drizzle", icon: <WiSprinkle /> },
  61: { description: "Light Rain", icon: <WiRain /> },
  63: { description: "Moderate Rain", icon: <WiRain /> },
  65: { description: "Heavy Rain", icon: <WiRain /> },
  71: { description: "Light Snow", icon: <WiSnow /> },
  73: { description: "Moderate Snow", icon: <WiSnow /> },
  75: { description: "Heavy Snow", icon: <WiSnow /> },
  80: { description: "Light Rain Showers", icon: <WiRain /> },
  81: { description: "Moderate Rain Showers", icon: <WiRain /> },
  82: { description: "Heavy Rain Showers", icon: <WiRain /> },
  95: { description: "Thunderstorm", icon: <WiThunderstorm /> },
  96: { description: "Thunderstorm with Light Hail", icon: <WiThunderstorm /> },
  99: { description: "Thunderstorm with Heavy Hail", icon: <WiThunderstorm /> },
};

const Weather = () => {
  // State variables for city input, weather data, and error messages
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Function to fetch weather data based on the entered city name
  const fetchWeather = async (cityName) => {
    try {
      // Fetching geographical coordinates of the city
      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`
      );

      // If no matching city is found, display an error
      if (geoResponse.data.length === 0) {
        setError("City not found. Please try another city.");
        setWeather(null);
        return;
      }

      // Extracting latitude and longitude from the response
      const { lat: latitude, lon: longitude } = geoResponse.data[0];

      // Fetching weather data using the geographical coordinates
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
        params: {
          latitude,
          longitude,
          current_weather: true, // Requesting only current weather data
        },
      });

      // Updating weather state with the fetched data
      setWeather(response.data.current_weather);
      setError(""); // Clearing any existing error messages
    } catch (err) {
      // Handling API errors and updating error state
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
    }
  };

  // Function to update the city input state when the input field changes
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    if (city.trim() === "") {
      setError("City name cannot be empty."); // Validating empty input
      setWeather(null);
      return;
    }
    fetchWeather(city); // Fetching weather data for the entered city
  };

  return (
    <div className="weather-container">
      {/* Application title */}
      <h1 className="app-title">Weather Now</h1>
      
      {/* Weather input form */}
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Get Weather
        </button>
      </form>
      
      {/* Displaying error messages */}
      {error && <p className="error-message">{error}</p>}
      
      {/* Displaying weather details */}
      {weather && (
        <div className="weather-details">
          <h2>Weather Details</h2>
          <p>🌡️ Temperature: {weather.temperature}°C</p>
          <p>💨 Wind Speed: {weather.windspeed} km/h</p>
          <div className="weather-condition">
            {/* Displaying weather icon and description */}
            {weatherDescriptions[weather.weathercode]?.icon || <WiCloud />}
            <p>
              {weatherDescriptions[weather.weathercode]?.description ||
                "Unknown Condition"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather; // Exporting the Weather component
