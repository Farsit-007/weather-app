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

export default function WeatherIcon({ icon, size = 64, color, className = "" }) {
  const Icon = ICONS[icon] || Sun;
  return (
    <Icon
      size={size}
      color={color}
      strokeWidth={icon === "snow" ? 2.5 : icon === "rain" ? 2.25 : 2}
      className={`flex-shrink-0 ${className}`}
    />
  );
}
