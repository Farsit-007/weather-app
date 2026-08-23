import {
  Sun,
  Moon,
  CloudSun,
  Cloud,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

/*
  Turns an icon name into a real icon from the lucide-react library.
  The names on the left are the ones weatherService.js puts in `weather.icon`.
*/
const ICONS = {
  clear: Sun,
  clear_night: Moon,
  partly_cloudy: CloudSun,
  cloudy: Cloud,
  fog: CloudFog,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
};

// Draws one weather icon. Unknown names fall back to the sun.
export default function WeatherIcon({ icon, size = 64, color, className = "" }) {
  const Icon = ICONS[icon] || Sun;

  return (
    <Icon
      size={size}
      color={color}
      // Snow and rain icons have thin details, so they get slightly thicker lines.
      strokeWidth={icon === "snow" ? 2.5 : icon === "rain" ? 2.25 : 2}
      className={`flex-shrink-0 ${className}`}
    />
  );
}
