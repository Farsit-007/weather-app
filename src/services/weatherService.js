/**
 * weatherService.js
 * -----------------
 * All network code for the app lives in this one file, so there is exactly one
 * place to look when you want to know how the weather data is fetched.
 *
 * We use Open-Meteo (https://open-meteo.com) because it is free, needs no API
 * key and no signup, and returns plain JSON. Two endpoints are used:
 *
 *   1. Geocoding - turns a city name into latitude / longitude.
 *   2. Forecast  - turns latitude / longitude into the current weather.
 */

/**
 * WMO weather codes
 * -----------------
 * Open-Meteo does not send a text like "raining". It sends a number in the
 * `weather_code` field. Those numbers come from the WMO 4677 standard, and the
 * official list of the codes Open-Meteo uses is documented at
 * https://open-meteo.com/en/docs (see the "WMO Weather interpretation codes"
 * table). Every code below is taken from that table.
 *
 * For each code we store the four things the UI needs:
 *
 *   condition   - a simple group name, used to pick a suggestion
 *                 (see utils/weatherRecommendation.js)
 *   description - the exact meaning of the code, shown as small text
 *   label       - a short friendly headline, shown under the temperature
 *   icon        - which picture to draw and which colours to use
 *                 (see components/WeatherScene.jsx and utils/weatherTheme.js)
 *
 * Several codes share a label on purpose: 61 ("Slight rain") and 65 ("Heavy
 * rain") are both just "Rain" to the user, but their descriptions differ.
 */
const WMO_CODES = {
  // 0-3: clear sky through to fully overcast
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

  // 45-48: fog
  45: { condition: "fog", description: "Fog", label: "Foggy", icon: "fog" },
  48: {
    condition: "fog",
    description: "Depositing rime fog",
    label: "Foggy",
    icon: "fog",
  },

  // 51-57: drizzle (light steady rain), and drizzle that freezes on contact
  51: {
    condition: "drizzle",
    description: "Light drizzle",
    label: "Drizzle",
    icon: "rain",
  },
  53: {
    condition: "drizzle",
    description: "Moderate drizzle",
    label: "Drizzle",
    icon: "rain",
  },
  55: {
    condition: "drizzle",
    description: "Dense drizzle",
    label: "Drizzle",
    icon: "rain",
  },
  56: {
    condition: "freezing_rain",
    description: "Light freezing drizzle",
    label: "Freezing Rain",
    icon: "rain",
  },
  57: {
    condition: "freezing_rain",
    description: "Dense freezing drizzle",
    label: "Freezing Rain",
    icon: "rain",
  },

  // 61-67: rain, and rain that freezes on contact
  61: {
    condition: "rain",
    description: "Slight rain",
    label: "Rain",
    icon: "rain",
  },
  63: {
    condition: "rain",
    description: "Moderate rain",
    label: "Rain",
    icon: "rain",
  },
  65: {
    condition: "rain",
    description: "Heavy rain",
    label: "Rain",
    icon: "rain",
  },
  66: {
    condition: "freezing_rain",
    description: "Light freezing rain",
    label: "Freezing Rain",
    icon: "rain",
  },
  67: {
    condition: "freezing_rain",
    description: "Heavy freezing rain",
    label: "Freezing Rain",
    icon: "rain",
  },

  // 71-77: snow fall
  71: {
    condition: "snow",
    description: "Slight snow fall",
    label: "Snow",
    icon: "snow",
  },
  73: {
    condition: "snow",
    description: "Moderate snow fall",
    label: "Snow",
    icon: "snow",
  },
  75: {
    condition: "snow",
    description: "Heavy snow fall",
    label: "Snow",
    icon: "snow",
  },
  77: {
    condition: "snow",
    description: "Snow grains",
    label: "Snow",
    icon: "snow",
  },

  // 80-86: showers (short bursts of rain or snow)
  80: {
    condition: "showers",
    description: "Slight rain showers",
    label: "Rain Showers",
    icon: "rain",
  },
  81: {
    condition: "showers",
    description: "Moderate rain showers",
    label: "Rain Showers",
    icon: "rain",
  },
  82: {
    condition: "showers",
    description: "Violent rain showers",
    label: "Rain Showers",
    icon: "rain",
  },
  85: {
    condition: "snow",
    description: "Slight snow showers",
    label: "Snow",
    icon: "snow",
  },
  86: {
    condition: "snow",
    description: "Heavy snow showers",
    label: "Snow",
    icon: "snow",
  },

  // 95-99: thunderstorms
  95: {
    condition: "thunderstorm",
    description: "Thunderstorm",
    label: "Thunderstorm",
    icon: "storm",
  },
  96: {
    condition: "thunderstorm",
    description: "Thunderstorm with slight hail",
    label: "Thunderstorm",
    icon: "storm",
  },
  99: {
    condition: "thunderstorm",
    description: "Thunderstorm with heavy hail",
    label: "Thunderstorm",
    icon: "storm",
  },
};

// Shown if the API ever sends a code that is missing from the table above, so
// the app still displays something instead of breaking.
const UNKNOWN_WEATHER = {
  condition: "unknown",
  description: "Mixed conditions",
  label: "Mixed Conditions",
  icon: "cloudy",
};

/**
 * Step 1 - find a place by name.
 *
 * Endpoint: https://geocoding-api.open-meteo.com/v1/search
 * Parameters:
 *   name     - the text the user typed, e.g. "Chattogram"
 *   count=1  - we only need the single best match
 *   language - language used for the returned place names
 *   format   - response format (json)
 *
 * Returns { name, country, lat, lon }, or null when no place matched.
 * Throws if the network request itself fails.
 */
export async function getCoordinatesByCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Geocoding request failed");

  const data = await response.json();

  // When nothing matches, Open-Meteo leaves out the `results` array entirely.
  if (!data.results || data.results.length === 0) return null;

  const place = data.results[0];
  return {
    name: place.name,
    country: place.country,
    lat: place.latitude,
    lon: place.longitude,
  };
}

/**
 * Step 2 - get the current weather for a latitude / longitude.
 *
 * Endpoint: https://api.open-meteo.com/v1/forecast
 * Parameters:
 *   latitude / longitude - the place to look up
 *   timezone=auto        - use the local timezone of that place
 *   current=...          - comma separated list of the values we want right now:
 *     temperature_2m        air temperature 2 m above ground, in °C
 *     apparent_temperature  the "feels like" temperature, in °C
 *     relative_humidity_2m  humidity, as a percentage
 *     wind_speed_10m        wind speed 10 m above ground, in km/h
 *     weather_code          the WMO code translated by WMO_CODES above
 *     is_day                1 during daylight, 0 at night
 *
 * The response also carries `time`, the local time the values were measured.
 *
 * Returns one flat object that the components can display directly. Rounding
 * happens here so the components only have to print the numbers.
 */
export async function getWeatherByCoordinates(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Weather request failed");

  const data = await response.json();
  const now = data.current;
  if (!now) throw new Error("Weather data is unavailable");

  // Turn the weather code number into text and an icon name.
  const weather = WMO_CODES[now.weather_code] || UNKNOWN_WEATHER;

  // A sun icon at midnight looks wrong, so use the moon icon after dark.
  const icon =
    weather.icon === "clear" && now.is_day === 0 ? "clear_night" : weather.icon;

  return {
    temperature: Math.round(now.temperature_2m),
    feelsLike: Math.round(now.apparent_temperature),
    humidity: now.relative_humidity_2m,
    windSpeed: Math.round(now.wind_speed_10m),
    // "2026-08-23T14:32" -> "14:32", the local time of that place.
    updatedAt: now.time ? now.time.slice(11, 16) : "",
    condition: weather.condition,
    description: weather.description,
    conditionLabel: weather.label,
    icon,
  };
}
