import WeatherIcon from "./WeatherIcon";

const TYPE_ICONS = {
  snow: "snow",
  rain: "rain",
  fog: "fog",
  hot: "clear",
  cold: "snow",
  warm: "partly_cloudy",
  sunny: "clear",
  cloudy: "cloudy",
  pleasant: "clear",
};

const TYPE_COLORS = {
  snow: "#818cf8",
  rain: "#3b82f6",
  fog: "#94a3b8",
  hot: "#f97316",
  cold: "#38bdf8",
  warm: "#fb923c",
  sunny: "#f59e0b",
  cloudy: "#64748b",
  pleasant: "#22c55e",
};

export default function RecommendationCard({ recommendation }) {
  if (!recommendation) return null;
  return (
    <section
      className={`card recommendation-card recommendation-${recommendation.type}`}
    >
      <span className="recommendation-icon">
        <WeatherIcon
          icon={TYPE_ICONS[recommendation.type] || "clear"}
          size={34}
          color={TYPE_COLORS[recommendation.type]}
        />
      </span>
      <div className="recommendation-body">
        <div className="recommendation-head">
          <span className="recommendation-badge">{recommendation.label}</span>
          <h3 className="recommendation-title">Your Smart Suggestion</h3>
        </div>
        <p className="recommendation-text">{recommendation.text}</p>
      </div>
    </section>
  );
}