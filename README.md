# SkyWise — Weather + Smart Suggestions

A small React app that shows the current weather for any city and gives you one
simple suggestion for your day: take an umbrella, carry water, wear warm clothes.

## Project Overview

**What it does**

1. You pick a location — either by typing a city name, or by letting the browser
   share your position.
2. The app fetches the current weather for that location.
3. It shows the temperature, the condition, how it feels, humidity and wind.
4. It adds one short piece of advice based on that weather.

**Technologies used**

| Tool | Why it is here |
| --- | --- |
| React 19 | Builds the user interface |
| Vite | Dev server and build tool |
| React Router | Switches between the two pages |
| Tailwind CSS | Styling |
| lucide-react | The interface icons |
| lottie-react | Plays the animated weather icons |
| Meteocons | The Lottie animation files themselves (MIT licensed) |
| Open-Meteo API | The weather data (free, no API key) |

**Main features**

- Search any city by name, tap a popular one, or use your current location
- Current temperature, "feels like", humidity and wind speed
- Weather condition shown as text and as a looping Lottie animation
- A smart suggestion for the day
- Loading and error messages
- Works on phones and on desktop

## Installation

You need [Node.js](https://nodejs.org) (version 18 or newer) installed.

```bash
# 1. Get the project
git clone <your-repository-url>
cd Map

# 2. Install the dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open the address Vite prints in the terminal, normally
<http://localhost:5173>.

There is **no API key and no `.env` file to set up** — Open-Meteo is free to
call directly.

Other commands:

```bash
npm run build     # build the production files into dist/
npm run preview   # preview that production build
npm run lint      # check the code with oxlint
```

## Weather API

### Why Open-Meteo

This project uses [Open-Meteo](https://open-meteo.com) because it is the
simplest weather API to learn with:

- free for non-commercial use
- **no API key and no signup**
- plain JSON responses
- one call gives everything the app needs

All API code lives in one file: **`src/services/weatherService.js`**.

### 1. Geocoding — city name to coordinates

The weather endpoint only understands latitude and longitude, so a typed city
name has to be converted first.

```text
GET https://geocoding-api.open-meteo.com/v1/search
      ?name=Chattogram
      &count=1
      &language=en
      &format=json
```

| Parameter | Meaning |
| --- | --- |
| `name` | The text the user typed |
| `count` | How many matches to return — we only need the best one |
| `language` | Language of the returned place names |
| `format` | Response format (`json`) |

Response (shortened):

```json
{
  "results": [
    { "name": "Chattogram", "country": "Bangladesh",
      "latitude": 22.3384, "longitude": 91.83168 }
  ]
}
```

If no place matches, the `results` array is **missing entirely** — that is how
the app detects an invalid city name.

### 2. Forecast — coordinates to current weather

```text
GET https://api.open-meteo.com/v1/forecast
      ?latitude=22.3384
      &longitude=91.83168
      &timezone=auto
      &current=temperature_2m,apparent_temperature,relative_humidity_2m,
               wind_speed_10m,weather_code,is_day
```

| Parameter | Meaning |
| --- | --- |
| `latitude` / `longitude` | The place to look up |
| `timezone=auto` | Use the local timezone of that place |
| `current` | Comma separated list of the values we want right now |

Important response fields (all inside the `current` object):

| Field | Meaning | Unit |
| --- | --- | --- |
| `temperature_2m` | Air temperature 2 m above ground | °C |
| `apparent_temperature` | The "feels like" temperature | °C |
| `relative_humidity_2m` | Humidity | % |
| `wind_speed_10m` | Wind speed 10 m above ground | km/h |
| `weather_code` | The condition, as a WMO number (see below) | — |
| `is_day` | `1` in daylight, `0` at night | — |

Response (shortened):

```json
{
  "current": {
    "temperature_2m": 28.6,
    "apparent_temperature": 32.6,
    "relative_humidity_2m": 82,
    "wind_speed_10m": 20.4,
    "weather_code": 55,
    "is_day": 1
  }
}
```

### Weather codes

The API does not send text like `"raining"`. It sends a **number** in
`weather_code`, following the WMO 4677 standard. The exact list of codes
Open-Meteo uses is in their docs at <https://open-meteo.com/en/docs>, under
"WMO Weather interpretation codes".

The app translates those numbers with the `WMO_CODES` table at the top of
`src/services/weatherService.js`:

```js
const WMO_CODES = {
  0: { condition: "clear", description: "Clear sky", label: "Clear Sky", icon: "clear" },
  // ...
  55: { condition: "drizzle", description: "Dense drizzle", label: "Drizzle", icon: "rain" },
};
```

Each entry holds the four things the interface needs:

| Key | Used for |
| --- | --- |
| `condition` | A simple group name, used to pick the suggestion |
| `description` | The exact meaning of the code, shown as small text |
| `label` | A short friendly headline, shown under the temperature |
| `icon` | Which animation to play |

Codes are grouped like this:

| Codes | Meaning |
| --- | --- |
| 0–3 | Clear sky through to overcast |
| 45, 48 | Fog |
| 51–57 | Drizzle and freezing drizzle |
| 61–67 | Rain and freezing rain |
| 71–77 | Snow fall |
| 80–86 | Rain and snow showers |
| 95–99 | Thunderstorms |

If a code ever arrives that is not in the table, the app falls back to
"Mixed Conditions" instead of breaking.

### From API data to screen

`getWeatherByCoordinates()` returns one flat, ready-to-display object, so the
components never have to touch raw API fields:

```js
{
  temperature: 29,          // rounded temperature_2m
  feelsLike: 33,            // rounded apparent_temperature
  humidity: 82,             // relative_humidity_2m
  windSpeed: 20,            // rounded wind_speed_10m
  updatedAt: "14:32",       // local time of the measurement
  condition: "drizzle",     // from WMO_CODES
  description: "Dense drizzle",
  conditionLabel: "Drizzle",
  icon: "rain"              // picks the scene, the colours and the icon
}
```

One extra rule: when the condition is clear and `is_day` is `0`, the icon
becomes `clear_night` so a moon is drawn instead of a sun.

## The Weather Page Layout

From 1024 px upwards the weather page is split into two columns:

```text
┌───────────────────────────┬───────────────────────────┐
│ WeatherCard               │ WeatherScene              │
│  location, temperature,   │  animated sky picture     │
│  feels like / humidity /  │  + condition and          │
│  wind                     │    "feels like"           │
├───────────────────────────┤                           │
│ RecommendationCard        │                           │
│  the one-line suggestion  │                           │
└───────────────────────────┴───────────────────────────┘
```

Below that width the grid falls back to one column and the animation moves to
the top, because it is the nicest thing to see first on a phone.

### The animations

The weather is shown with real **Lottie** animations instead of a static icon:
a spinning sun, drifting clouds, falling rain, tumbling snow, rolling fog or a
thunderstorm with a flashing bolt.

The animation files come from [Meteocons](https://github.com/basmilius/meteocons)
by Bas Milius — 475+ hand-crafted weather animations, MIT licensed. The ones
this app uses are copied into `public/animations`, so nothing is fetched from
someone else's server and the app also works offline:

```text
public/animations/
├── weather/     the sky animations, one file per weather.icon value
│   ├── clear.json          clear_night.json     partly_cloudy.json
│   ├── cloudy.json         fog.json             rain.json
│   └── snow.json           storm.json
├── advice/      the suggestion animations, one file per recommendation type
│   ├── hot.json    warm.json    cold.json    sunny.json   rain.json
│   └── snow.json   fog.json     cloudy.json  pleasant.json
└── LICENSE.txt  the Meteocons licence notice
```

Naming the files after the values the app already has is the whole trick: there
is **no table mapping weather to pictures** anywhere in the code. The component
builds the path and `lottie-react` plays it:

```jsx
// components/WeatherLottie.jsx
<LottieLight src={`/animations/${kind}/${name}.json`} className={className} autoplay loop />

// components/WeatherScene.jsx — the sky animation
<WeatherLottie kind="weather" name={weather.icon} className="w-[260px] h-[260px]" />

// components/RecommendationCard.jsx — the umbrella, the thermometer, ...
<WeatherLottie kind="advice" name={recommendation.type} className="w-[46px] h-[46px]" />
```

`LottieLight` is the small build of the player: SVG only and no expression
engine, which keeps the bundle down. Each animation is a small JSON file
(2–28 KB) loaded only when it is actually shown.

The colours around the animation come from `src/utils/weatherTheme.js`, which
holds one theme per icon name (sky gradient, accent colour, text colours).
`WeatherCard` reads the same file, so the temperature on the left always matches
the picture on the right.

## Project Structure

```text
public/
└── animations/                  the Lottie animation files (see above)
src/
├── components/
│   ├── LocationModal.jsx        popup where the user picks a location
│   ├── WeatherCard.jsx          card with temperature and stats
│   ├── WeatherScene.jsx         the animated picture of the sky
│   ├── RecommendationCard.jsx   the suggestion card
│   └── WeatherLottie.jsx        name -> Lottie animation
├── pages/
│   ├── Home.jsx                 landing page with the main button
│   └── Weather.jsx              result page, two columns (loading / error / weather)
├── services/
│   └── weatherService.js        ALL API calls + the weather code table
├── utils/
│   ├── weatherRecommendation.js turns weather into one piece of advice
│   └── weatherTheme.js          the colours used by the weather page
├── App.jsx                      the two routes
├── main.jsx                     starts React
└── index.css                    fonts, background, shared classes
```

| Folder | Responsible for |
| --- | --- |
| `components/` | Pieces of interface that are reused or reduce page size |
| `pages/` | One file per screen (`/` and `/weather`) |
| `services/` | Talking to the outside world — this is the only place with `fetch` |
| `utils/` | Plain logic with no API calls and no interface |
| `public/` | Files served as they are, such as the animation JSON |

## How the Application Works

```text
User opens the home page
        ↓
Clicks "Check My Weather" → LocationModal opens
        ↓
Types a city                        or   clicks "Use My Location"
        ↓                                        ↓
getCoordinatesByCity(city)               browser gives coordinates
        ↓                                        ↓
        └──────────→ latitude & longitude ←──────┘
        ↓
navigate("/weather", { state: { location } })
        ↓
Weather page calls getWeatherByCoordinates(lat, lon)
        ↓
Open-Meteo returns JSON (temperature, humidity, weather_code, ...)
        ↓
weather_code is converted with WMO_CODES → condition, label, icon
        ↓
WeatherCard shows the numbers (left column)
WeatherScene draws the matching animation (right column)
RecommendationCard shows the suggestion
```

The chosen location is passed between the two pages using React Router's
`state`, so there is no global state library in this project.

### How the suggestion is chosen

`src/utils/weatherRecommendation.js` checks a list of rules from top to bottom
and the **first match wins**:

1. Snow → "wear warm clothes and take it slow"
2. Any rain, drizzle, showers or thunderstorm → "take an umbrella"
3. Fog → "drive carefully"
4. 32 °C or hotter → "take a water bottle"
5. 15 °C or colder → "wear warm clothes"
6. 28 °C or hotter → "take some water"
7. Clear sky → "sunny, consider sunglasses"
8. Cloudy → "a light jacket might come in handy"
9. Anything else → "the weather looks comfortable"

Conditions are checked before temperature, because "take an umbrella" is more
useful to hear than "it's warm".

## Error Handling

The app handles the common problems with plain messages, no extra libraries:

| Situation | What the user sees |
| --- | --- |
| Empty search box | "Please enter a city name." |
| City not found | "We couldn't find that location. Please check the spelling." |
| Geocoding request fails | "Something went wrong. Please check your connection and try again." |
| Location permission denied | "Location access was denied. Please search for your city instead." |
| Weather request fails or returns no data | An error card with a "Try again" button |
| `/weather` opened without a location | A card asking the user to pick a location first |
| Request still running | A spinner and "Getting your weather..." |

## API Documentation (quick reference)

Copy either line into your browser to see the raw JSON the app works with.

**Find a city:**

```text
https://geocoding-api.open-meteo.com/v1/search?name=Chattogram&count=1&language=en&format=json
```

- `name` — the search text
- `count` — number of results (1 is enough)
- `language` — language of the place names
- `format` — `json`

**Get the current weather:**

```text
https://api.open-meteo.com/v1/forecast?latitude=22.3384&longitude=91.83168&timezone=auto&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day
```

- `latitude`, `longitude` — the place
- `timezone=auto` — use that place's local timezone
- `current` — which live values to include

Full documentation: <https://open-meteo.com/en/docs>
