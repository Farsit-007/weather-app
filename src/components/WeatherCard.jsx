import { Thermometer, Droplet, Wind } from "lucide-react";
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

export default function WeatherCard({ locationName, weather }) {
  const gradient = CARD_GRADIENTS[weather.icon] || CARD_GRADIENTS.unknown;
  const iconColor = ICON_COLORS[weather.icon] || "#64748b";

  return (
    <section
      className="bg-white border border-white/80 rounded-card shadow-lg-soft w-full max-w-[520px] pt-[34px] px-[34px] pb-3 max-[480px]:py-7 max-[480px]:px-5 max-[480px]:pb-2"
      style={{ background: gradient }}
    >
      <div className="text-center">
        <span className="inline-block text-[12px] font-bold tracking-widelabel uppercase text-sky-deep bg-white/75 rounded-full px-4 py-[6px]">
          Today's Weather
        </span>
        <h2 className="font-display text-[26px] font-bold mt-3 mb-0 m-0">{locationName}</h2>
      </div>

      <div className="flex items-center justify-center gap-7 pt-[26px] pb-[10px] max-[480px]:flex-col max-[480px]:gap-4 max-[480px]:text-center">
        <span className="inline-flex items-center justify-center w-[132px] h-[132px] rounded-full bg-white/75 shadow-md-soft flex-shrink-0">
          <WeatherIcon icon={weather.icon} size={92} color={iconColor} />
        </span>
        <div className="temperature-block">
          <span className="block font-display text-[80px] max-[480px]:!text-[64px] font-extrabold tracking-tightx leading-none text-orange-deep">
            {weather.temperature}°
          </span>
          <span className="block font-display text-[19px] font-bold mt-[10px]">
            {weather.conditionLabel}
          </span>
          <span className="block text-[14px] text-slate mt-[3px]">{weather.description}</span>
        </div>
      </div>

      <div className="flex mt-[26px] bg-white/65 border border-white/70 rounded-[18px] overflow-hidden backdrop-blur-md max-[480px]:flex-col">
        <div className="flex-1 text-center px-2 py-[15px] max-[480px]:flex max-[480px]:items-center max-[480px]:justify-between max-[480px]:px-[18px] max-[480px]:py-3 border-r border-white/90 last:border-r-0 max-[480px]:border-r-0 max-[480px]:border-t max-[480px]:border-white/90 max-[480px]:first:border-t-0">
          <Thermometer size={19} strokeWidth={2.25} className="text-sky-deep mb-[6px] max-[480px]:m-0 max-[480px]:order-first inline-block" />
          <span className="block text-[11.5px] font-semibold text-slate mb-1 max-[480px]:m-0 max-[480px]:ml-auto max-[480px]:px-3">Feels like</span>
          <span className="block text-[15.5px] max-[480px]:!text-[15px] font-bold">{weather.feelsLike}°C</span>
        </div>
        <div className="flex-1 text-center px-2 py-[15px] max-[480px]:flex max-[480px]:items-center max-[480px]:justify-between max-[480px]:px-[18px] max-[480px]:py-3 border-r border-white/90 last:border-r-0 max-[480px]:border-r-0 max-[480px]:border-t max-[480px]:border-white/90 max-[480px]:first:border-t-0">
          <Droplet size={19} strokeWidth={2.25} className="text-sky-deep mb-[6px] max-[480px]:m-0 max-[480px]:order-first inline-block" />
          <span className="block text-[11.5px] font-semibold text-slate mb-1 max-[480px]:m-0 max-[480px]:ml-auto max-[480px]:px-3">Humidity</span>
          <span className="block text-[15.5px] max-[480px]:!text-[15px] font-bold">{weather.humidity}%</span>
        </div>
        <div className="flex-1 text-center px-2 py-[15px] max-[480px]:flex max-[480px]:items-center max-[480px]:justify-between max-[480px]:px-[18px] max-[480px]:py-3 max-[480px]:border-t max-[480px]:border-white/90">
          <Wind size={19} strokeWidth={2.25} className="text-sky-deep mb-[6px] max-[480px]:m-0 max-[480px]:order-first inline-block" />
          <span className="block text-[11.5px] font-semibold text-slate mb-1 max-[480px]:m-0 max-[480px]:ml-auto max-[480px]:px-3">Wind speed</span>
          <span className="block text-[15.5px] max-[480px]:!text-[15px] font-bold">{weather.windSpeed} km/h</span>
        </div>
      </div>
    </section>
  );
}