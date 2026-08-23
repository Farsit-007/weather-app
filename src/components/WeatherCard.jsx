import { Thermometer, Droplet, Wind } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

/*
  Colours for the big weather card. The key is the `icon` name that
  weatherService.js returns, so a rainy day gets a blue card and a clear day
  gets a yellow one.
*/
const CARD_STYLES = {
  clear: { gradient: "linear-gradient(165deg, #fefce8 0%, #fde68a 100%)", iconColor: "#f59e0b" },
  clear_night: { gradient: "linear-gradient(165deg, #eef2ff 0%, #c7d2fe 100%)", iconColor: "#6366f1" },
  partly_cloudy: { gradient: "linear-gradient(165deg, #eff7ff 0%, #bcd7fb 100%)", iconColor: "#f59e0b" },
  cloudy: { gradient: "linear-gradient(165deg, #f3f6fa 0%, #d3dbe8 100%)", iconColor: "#5b6b85" },
  fog: { gradient: "linear-gradient(165deg, #f4f7fa 0%, #cdd7e3 100%)", iconColor: "#8fa0b8" },
  rain: { gradient: "linear-gradient(165deg, #eef6ff 0%, #a9cffb 100%)", iconColor: "#3b82f6" },
  snow: { gradient: "linear-gradient(165deg, #f0faff 0%, #bfe4fb 100%)", iconColor: "#38bdf8" },
  storm: { gradient: "linear-gradient(165deg, #eef0ff 0%, #b7befa 100%)", iconColor: "#6366f1" },
  unknown: { gradient: "linear-gradient(165deg, #f3f6fa 0%, #d5dde9 100%)", iconColor: "#64748b" },
};

/*
  One of the three small boxes at the bottom of the card (feels like, humidity,
  wind). Written once and reused three times so the layout classes only exist in
  a single place.

  On narrow screens the boxes stack as rows; from 481px up they sit side by side
  as columns.
*/
function Stat({ icon: Icon, label, value }) {
  return (
    <div
      className="flex-1 flex items-center gap-3 px-[18px] py-3 border-t border-white/90 first:border-t-0
                 min-[481px]:flex-col min-[481px]:gap-[3px] min-[481px]:px-2 min-[481px]:py-[15px]
                 min-[481px]:border-t-0 min-[481px]:border-l min-[481px]:first:border-l-0"
    >
      <Icon size={19} strokeWidth={2.25} className="text-sky-deep flex-shrink-0" />
      <span className="text-[11.5px] font-semibold text-slate">{label}</span>
      <span className="text-[15px] font-bold ml-auto min-[481px]:ml-0">{value}</span>
    </div>
  );
}

// The main card: location name, weather icon, temperature and the three stats.
export default function WeatherCard({ locationName, weather }) {
  const style = CARD_STYLES[weather.icon] || CARD_STYLES.unknown;

  return (
    <section
      className="w-full max-w-[520px] border border-white/80 rounded-card shadow-lg-soft pt-[34px] px-[34px] pb-3 max-[480px]:py-7 max-[480px]:px-5 max-[480px]:pb-2"
      style={{ background: style.gradient }}
    >
      <div className="text-center">
        <span className="inline-block text-[12px] font-bold tracking-widelabel uppercase text-sky-deep bg-white/75 rounded-full px-4 py-[6px]">
          Today's Weather
        </span>
        <h2 className="font-display text-[26px] font-bold mt-3 mb-0 m-0">{locationName}</h2>
      </div>

      <div className="flex items-center justify-center gap-7 pt-[26px] pb-[10px] max-[480px]:flex-col max-[480px]:gap-4 max-[480px]:text-center">
        <span className="inline-flex items-center justify-center w-[132px] h-[132px] rounded-full bg-white/75 shadow-md-soft flex-shrink-0">
          <WeatherIcon icon={weather.icon} size={92} color={style.iconColor} />
        </span>
        <div>
          <span className="block font-display text-[80px] max-[480px]:!text-[64px] font-extrabold tracking-tightx leading-none text-orange-deep">
            {weather.temperature}°
          </span>
          {/* Short headline, e.g. "Rain" */}
          <span className="block font-display text-[19px] font-bold mt-[10px]">{weather.conditionLabel}</span>
          {/* Exact meaning of the weather code, e.g. "Heavy rain" */}
          <span className="block text-[14px] text-slate mt-[3px]">{weather.description}</span>
        </div>
      </div>

      <div className="flex flex-col min-[481px]:flex-row mt-[26px] bg-white/65 border border-white/70 rounded-[18px] overflow-hidden backdrop-blur-md">
        <Stat icon={Thermometer} label="Feels like" value={`${weather.feelsLike}°C`} />
        <Stat icon={Droplet} label="Humidity" value={`${weather.humidity}%`} />
        <Stat icon={Wind} label="Wind speed" value={`${weather.windSpeed} km/h`} />
      </div>
    </section>
  );
}
