import WeatherIcon from "./WeatherIcon";

/*
  Look and feel of the suggestion card, one entry per suggestion type.
  The types come from getWeatherRecommendation() in utils/weatherRecommendation.js.

    icon   - which weather icon to draw
    color  - colour of that icon
    card   - background gradient and left border of the card
    badge  - background colour of the small label pill
*/
const REC_STYLES = {
  hot: { icon: "clear", color: "#f97316", card: "bg-rec-hot border-l-[#f97316]", badge: "bg-[#f97316]" },
  warm: { icon: "partly_cloudy", color: "#fb923c", card: "bg-rec-warm border-l-[#fb923c]", badge: "bg-[#fb923c]" },
  cold: { icon: "snow", color: "#38bdf8", card: "bg-rec-cold border-l-[#38bdf8]", badge: "bg-[#38bdf8]" },
  sunny: { icon: "clear", color: "#f59e0b", card: "bg-rec-sunny border-l-[#f59e0b]", badge: "bg-[#f59e0b]" },
  rain: { icon: "rain", color: "#3b82f6", card: "bg-rec-rain border-l-[#3b82f6]", badge: "bg-[#3b82f6]" },
  snow: { icon: "snow", color: "#818cf8", card: "bg-rec-snow border-l-[#818cf8]", badge: "bg-[#818cf8]" },
  fog: { icon: "fog", color: "#94a3b8", card: "bg-rec-fog border-l-[#94a3b8]", badge: "bg-[#94a3b8]" },
  cloudy: { icon: "cloudy", color: "#64748b", card: "bg-rec-cloudy border-l-[#64748b]", badge: "bg-[#64748b]" },
  pleasant: { icon: "clear", color: "#22c55e", card: "bg-rec-pleasant border-l-[#22c55e]", badge: "bg-[#22c55e]" },
};

// Shows the one-line advice under the weather card, e.g. "take an umbrella".
export default function RecommendationCard({ recommendation }) {
  // Nothing to show if there is no weather yet.
  if (!recommendation) return null;

  const style = REC_STYLES[recommendation.type] || REC_STYLES.pleasant;

  return (
    <section
      className={`flex items-start gap-[18px] w-full max-w-[520px] mt-6 p-6 max-[480px]:p-5 rounded-lg border-l-[5px] border-solid shadow-md-soft ${style.card}`}
    >
      <span className="inline-flex items-center justify-center w-[58px] h-[58px] rounded-[18px] bg-white/85 shadow-sm-soft flex-shrink-0">
        <WeatherIcon icon={style.icon} size={34} color={style.color} />
      </span>
      <div>
        <div className="flex items-center gap-3 mb-2 max-[480px]:flex-wrap">
          <span className={`text-[11px] font-bold uppercase tracking-widebadge text-white rounded-full px-3 py-1 ${style.badge}`}>
            {recommendation.label}
          </span>
          <h3 className="text-[12.5px] font-bold tracking-widelabel3 uppercase text-slate m-0">
            Your Smart Suggestion
          </h3>
        </div>
        <p className="text-[17.5px] font-semibold leading-[1.55] text-navy m-0">
          {recommendation.text}
        </p>
      </div>
    </section>
  );
}
