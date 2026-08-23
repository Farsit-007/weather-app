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

const REC_STYLES = {
  hot: "bg-rec-hot border-l-[#f97316]",
  warm: "bg-rec-warm border-l-[#fb923c]",
  cold: "bg-rec-cold border-l-[#38bdf8]",
  sunny: "bg-rec-sunny border-l-[#f59e0b]",
  rain: "bg-rec-rain border-l-[#3b82f6]",
  snow: "bg-rec-snow border-l-[#818cf8]",
  fog: "bg-rec-fog border-l-[#94a3b8]",
  cloudy: "bg-rec-cloudy border-l-[#64748b]",
  pleasant: "bg-rec-pleasant border-l-[#22c55e]",
};

const REC_BADGE_BG = {
  hot: "bg-[#f97316]",
  warm: "bg-[#fb923c]",
  cold: "bg-[#38bdf8]",
  sunny: "bg-[#f59e0b]",
  rain: "bg-[#3b82f6]",
  snow: "bg-[#818cf8]",
  fog: "bg-[#94a3b8]",
  cloudy: "bg-[#64748b]",
  pleasant: "bg-[#22c55e]",
};

export default function RecommendationCard({ recommendation }) {
  if (!recommendation) return null;
  const recStyle = REC_STYLES[recommendation.type] || REC_STYLES.pleasant;
  const badgeBg = REC_BADGE_BG[recommendation.type] || REC_BADGE_BG.pleasant;
  return (
    <section
      className={`flex items-start rounded-lg gap-[18px] w-full max-w-[520px] mt-6 p-6 border-l-[5px] border-solid border-l-current shadow-md-soft max-[480px]:p-5 ${recStyle}`}
    >
      <span className="inline-flex items-center justify-center w-[58px] h-[58px] rounded-[18px] bg-white/85 shadow-sm-soft flex-shrink-0">
        <WeatherIcon
          icon={TYPE_ICONS[recommendation.type] || "clear"}
          size={34}
          color={TYPE_COLORS[recommendation.type]}
        />
      </span>
      <div className="">
        <div className="flex items-center gap-3 mb-2 max-[480px]:flex-wrap">
          <span
            className={`text-[11px] font-bold uppercase tracking-widebadge text-white rounded-full px-3 py-1 ${badgeBg}`}
          >
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
