const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const WMO_CODES = {
  0: { condition: "clear", description: "Clear sky" },
  1: { condition: "partly_cloudy", description: "Mainly clear" },
  2: { condition: "partly_cloudy", description: "Partly cloudy" },
  3: { condition: "cloudy", description: "Overcast" },
  45: { condition: "fog", description: "Foggy" },
  48: { condition: "fog", description: "Rime fog" },
  51: { condition: "drizzle", description: "Light drizzle" },
  53: { condition: "drizzle", description: "Drizzle" },
  55: { condition: "drizzle", description: "Heavy drizzle" },
  56: { condition: "freezing_rain", description: "Freezing drizzle" },
  57: { condition: "freezing_rain", description: "Freezing drizzle" },
  61: { condition: "rain", description: "Light rain" },
  63: { condition: "rain", description: "Rain" },
  65: { condition: "rain", description: "Heavy rain" },
  66: { condition: "freezing_rain", description: "Freezing rain" },
  67: { condition: "freezing_rain", description: "Freezing rain" },
  71: { condition: "snow", description: "Light snow" },
  73: { condition: "snow", description: "Snow" },
  75: { condition: "snow", description: "Heavy snow" },
  77: { condition: "snow", description: "Snow grains" },
  80: { condition: "showers", description: "Light showers" },
  81: { condition: "showers", description: "Rain showers" },
  82: { condition: "showers", description: "Violent showers" },
  85: { condition: "snow", description: "Snow showers" },
  86: { condition: "snow", description: "Snow showers" },
  95: { condition: "thunderstorm", description: "Thunderstorm" },
  96: { condition: "thunderstorm", description: "Thunderstorm with hail" },
  99: { condition: "thunderstorm", description: "Thunderstorm with hail" },
};

const CONDITION_LABELS = {
  clear: "Clear Sky",
  partly_cloudy: "Partly Cloudy",
  cloudy: "Cloudy",
  fog: "Foggy",
  drizzle: "Drizzle",
  rain: "Rain",
  freezing_rain: "Freezing Rain",
  snow: "Snow",
  showers: "Rain Showers",
  thunderstorm: "Thunderstorm",
  unknown: "Mixed Conditions",
};

const ICON_BY_CONDITION = {
  drizzle: "rain",
  freezing_rain: "rain",
  showers: "rain",
  thunderstorm: "storm",
  snow: "snow",
  fog: "fog",
  cloudy: "cloudy",
  partly_cloudy: "partly_cloudy",
  clear: "clear",
  unknown: "cloudy",
};

function describeWeatherCode(code) {
  return (
    WMO_CODES[code] || {
      condition: "unknown",
      description: "Mixed conditions",
    }
  );
}

export async function getCoordinatesByCity(city) {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("api_error");
  const data = await response.json();
  if (!data.results || data.results.length === 0) return null;
  const { name, country, latitude, longitude } = data.results[0];
  return { name, country, lat: latitude, lon: longitude };
}

export async function getWeatherByCoordinates(latitude, longitude) {
  const url = `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("api_error");
  const data = await response.json();
  const current = data.current;
  const info = describeWeatherCode(current.weather_code);
  return {
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    condition: info.condition,
    description: info.description,
    conditionLabel: CONDITION_LABELS[info.condition] || "Mixed Conditions",
    icon: ICON_BY_CONDITION[info.condition] || "cloudy",
  };
}