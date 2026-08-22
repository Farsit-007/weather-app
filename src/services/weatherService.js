// The Open-Meteo API returns weather as a number (0, 61, 95, ...).
// This table turns each number straight into everything the UI needs:
// a condition name, a description, a display label, and an icon.
const WMO_CODES = {
  0: {
    condition: "clear",
    description: "Clear sky",
    label: "Clear Sky",
    icon: "clear",
  },
  1: {
    condition: "partly_cloudy",
    description: "Mainly clear",
    label: "Partly Cloudy",
    icon: "partly_cloudy",
  },
  2: {
    condition: "partly_cloudy",
    description: "Partly cloudy",
    label: "Partly Cloudy",
    icon: "partly_cloudy",
  },
  3: {
    condition: "cloudy",
    description: "Overcast",
    label: "Cloudy",
    icon: "cloudy",
  },
  45: { condition: "fog", description: "Foggy", label: "Foggy", icon: "fog" },
  48: {
    condition: "fog",
    description: "Rime fog",
    label: "Foggy",
    icon: "fog",
  },
  51: {
    condition: "drizzle",
    description: "Light drizzle",
    label: "Drizzle",
    icon: "rain",
  },
  53: {
    condition: "drizzle",
    description: "Drizzle",
    label: "Drizzle",
    icon: "rain",
  },
  55: {
    condition: "drizzle",
    description: "Heavy drizzle",
    label: "Drizzle",
    icon: "rain",
  },
  56: {
    condition: "freezing_rain",
    description: "Freezing drizzle",
    label: "Freezing Rain",
    icon: "rain",
  },
  57: {
    condition: "freezing_rain",
    description: "Freezing drizzle",
    label: "Freezing Rain",
    icon: "rain",
  },
  61: {
    condition: "rain",
    description: "Light rain",
    label: "Rain",
    icon: "rain",
  },
  63: { condition: "rain", description: "Rain", label: "Rain", icon: "rain" },
  65: {
    condition: "rain",
    description: "Heavy rain",
    label: "Rain",
    icon: "rain",
  },
  66: {
    condition: "freezing_rain",
    description: "Freezing rain",
    label: "Freezing Rain",
    icon: "rain",
  },
  67: {
    condition: "freezing_rain",
    description: "Freezing rain",
    label: "Freezing Rain",
    icon: "rain",
  },
  71: {
    condition: "snow",
    description: "Light snow",
    label: "Snow",
    icon: "snow",
  },
  73: { condition: "snow", description: "Snow", label: "Snow", icon: "snow" },
  75: {
    condition: "snow",
    description: "Heavy snow",
    label: "Snow",
    icon: "snow",
  },
  77: {
    condition: "snow",
    description: "Snow grains",
    label: "Snow",
    icon: "snow",
  },
  80: {
    condition: "showers",
    description: "Light showers",
    label: "Rain Showers",
    icon: "rain",
  },
  81: {
    condition: "showers",
    description: "Rain showers",
    label: "Rain Showers",
    icon: "rain",
  },
  82: {
    condition: "showers",
    description: "Violent showers",
    label: "Rain Showers",
    icon: "rain",
  },
  85: {
    condition: "snow",
    description: "Snow showers",
    label: "Snow",
    icon: "snow",
  },
  86: {
    condition: "snow",
    description: "Snow showers",
    label: "Snow",
    icon: "snow",
  },
  95: {
    condition: "thunderstorm",
    description: "Thunderstorm",
    label: "Thunderstorm",
    icon: "storm",
  },
  96: {
    condition: "thunderstorm",
    description: "Thunderstorm with hail",
    label: "Thunderstorm",
    icon: "storm",
  },
  99: {
    condition: "thunderstorm",
    description: "Thunderstorm with hail",
    label: "Thunderstorm",
    icon: "storm",
  },
};

// What we show when the API returns a code we don't know.
const UNKNOWN_WEATHER = {
  condition: "unknown",
  description: "Mixed conditions",
  label: "Mixed Conditions",
  icon: "cloudy",
};

// Look up a city name and return its latitude / longitude.
// Returns null if the city was not found.
export async function getCoordinatesByCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("api_error");

  const data = await response.json();
  if (!data.results || data.results.length === 0) return null;

  const place = data.results[0];
  return {
    name: place.name,
    country: place.country,
    lat: place.latitude,
    lon: place.longitude,
  };
}

// Get the current weather for a latitude / longitude.
export async function getWeatherByCoordinates(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("api_error");

  const now = (await response.json()).current;
  const w = WMO_CODES[now.weather_code] || UNKNOWN_WEATHER;

  return {
    temperature: Math.round(now.temperature_2m),
    feelsLike: Math.round(now.apparent_temperature),
    humidity: now.relative_humidity_2m,
    windSpeed: Math.round(now.wind_speed_10m),
    condition: w.condition,
    description: w.description,
    conditionLabel: w.label,
    icon: w.icon,
  };
}
