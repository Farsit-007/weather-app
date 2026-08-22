import WeatherIcon from "./WeatherIcon";

const CARD_GRADIENTS = {
  clear: "linear-gradient(165deg, #fefce8 0%, #fde68a 100%)",
  clear_night: "linear-gradient(165deg, #eef2ff 0%, #c7d2fe 100%)",
  partly_cloudy: "linear-gradient(165deg, #eff7ff 0%, #bcd7fb 100%)",
  cloudy: "linear-gradient(165deg, #f3f6fa 0%, #d3dbe8 100%)",
  fog: "linear-gradient(165deg, #f4f7fa 0%, #cdd7e3 100%)",
  rain: "linear-gradient(165deg, #eef6ff 0%, #a9cffb 100%)",
  snow: "linear-gradient(165deg, #f0faff 0%, #bfe4fb 100%)",
  storm: "linear-gradient(165deg, #eef0ff 0%, #b7befa 100%)",
  unknown: "linear-gradient(165deg, #f3f6fa 0%, #d5dde9 100%)",
};

const ICON_COLORS = {
  clear: "#f59e0b",
  clear_night: "#6366f1",
  partly_cloudy: "#f59e0b",
  cloudy: "#5b6b85",
  fog: "#8fa0b8",
  rain: "#3b82f6",
  snow: "#38bdf8",
  storm: "#6366f1",
  unknown: "#64748b",
};

function StatIcon({ name }) {
  const icons = {
    thermometer: <path d="M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" />,
    droplet: <path d="M12 2.7s6 6.1 6 10.3a6 6 0 1 1-12 0c0-4.2 6-10.3 6-10.3z" />,
    wind: (
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 2 4H2" />
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

export default function WeatherCard({ locationName, weather }) {
  const gradient = CARD_GRADIENTS[weather.icon] || CARD_GRADIENTS.unknown;
  const iconColor = ICON_COLORS[weather.icon] || "#64748b";

  return (
    <section className="card weather-card" style={{ background: gradient }}>
      <div className="weather-card-head">
        <span className="location-label">Today's Weather</span>
        <h2 className="location-name">{locationName}</h2>
      </div>

      <div className="weather-card-main">
        <span className="weather-icon-ring">
          <WeatherIcon icon={weather.icon} size={92} color={iconColor} />
        </span>
        <div className="temperature-block">
          <span className="temperature">{weather.temperature}°</span>
          <span className="condition">{weather.conditionLabel}</span>
          <span className="description">{weather.description}</span>
        </div>
      </div>

      <div className="weather-stats">
        <div className="stat">
          <StatIcon name="thermometer" />
          <span className="stat-label">Feels like</span>
          <span className="stat-value">{weather.feelsLike}°C</span>
        </div>
        <div className="stat">
          <StatIcon name="droplet" />
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{weather.humidity}%</span>
        </div>
        <div className="stat">
          <StatIcon name="wind" />
          <span className="stat-label">Wind speed</span>
          <span className="stat-value">{weather.windSpeed} km/h</span>
        </div>
      </div>
    </section>
  );
}