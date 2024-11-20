### Weather Now Application 

Weather Now is a React-based weather application that provides real-time weather updates for cities across the globe. Jamie(Outdoor Enthusiast) can input a city name to view current weather conditions such as temperature, wind speed, and descriptive weather details with matching icons. The app integrates APIs for geocoding and weather data to ensure accurate and dynamic updates. 


## Features 
-City-based weather search with geolocation support.
-Real-time weather details, including temperature and wind speed.
-Dynamic icons for weather conditions, powered by React Icons.
-Error handling for invalid city inputs or API failures.
-Responsive design for optimal viewing on all devices. 

### npm start 

-Runs the app in development mode.
-Open http://localhost:3000 to view it in your browser.
-The app will reload automatically if you make edits.
-You may also see lint errors in the console. 

## API Integration 

### Geocoding API 

Endpoint: Nominatim OpenStreetMap API
Purpose: Retrieves latitude and longitude for the given city name.
Usage: Helps locate the city for weather data queries.

### Weather API
Endpoint: Open-Meteo API
Purpose: Provides real-time weather details like temperature, wind speed, and conditions. 

## How It Works 

Input City Name: Enter the desired city name in the input field.
Geocoding: The app fetches the latitude and longitude of the city using the Nominatim API.
Weather Data Retrieval: Using the geocoded data, the Open-Meteo API is called to fetch current weather conditions.
Display Weather: Weather details are displayed, including:
Temperature: In Celsius.
Wind Speed: In km/h.
Weather Condition: With an icon and description. 


## Error Handling
### Displays a meaningful error if:
The city is not found.
The input is empty.
The API fails to fetch data. 

## Deployment 

### Hosting on a Static Server 

-Run npm run build to create a production-ready build of the app.
-Deploy the contents of the build/ folder to any static hosting service, such as Netlify, Vercel.