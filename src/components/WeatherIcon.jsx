const ICONS = {
  clear: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="10" fill="currentColor" />
      <path
        d="M32 8v6M32 50v6M8 32h6M50 32h6M15 15l4.2 4.2M44.8 44.8l4.2 4.2M49 15l-4.2 4.2M19.2 44.8l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
  clear_night: (
    <svg viewBox="0 0 64 64">
      <path
        d="M40 12a20 20 0 1 0 12 36 18 18 0 0 1-12-36z"
        fill="currentColor"
      />
    </svg>
  ),
  partly_cloudy: (
    <svg viewBox="0 0 64 64">
      <circle cx="19" cy="19" r="8" fill="currentColor" />
      <path
        d="M19 3v4M19 31v4M3 19h4M31 19h4M7.8 7.8l2.8 2.8M27.4 27.4l2.8 2.8M30.2 7.8l-2.8 2.8M10.6 27.4l-2.8 2.8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M22 40h26a9 9 0 0 0 0-18 11 11 0 0 0-21-4A8 8 0 0 0 22 40z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  ),
  cloudy: (
    <svg viewBox="0 0 64 64">
      <path
        d="M24 44h26a9 9 0 0 0 0-18 11 11 0 0 0-21-4A8 8 0 0 0 24 44z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 44h26a9 9 0 0 0 0-18 11 11 0 0 0-21-4A8 8 0 0 0 12 44z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  ),
  fog: (
    <svg viewBox="0 0 64 64">
      <path
        d="M18 34h28a9 9 0 0 0 0-18 11 11 0 0 0-21-4A8 8 0 0 0 18 34z"
        fill="currentColor"
      />
      <path
        d="M16 44h32M12 52h40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
  rain: (
    <svg viewBox="0 0 64 64">
      <path
        d="M24 40h26a9 9 0 0 0 0-18 11 11 0 0 0-21-4A8 8 0 0 0 24 40z"
        fill="currentColor"
      />
      <path
        d="M27 50v7M35 50v7M43 50v7"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
  snow: (
    <svg viewBox="0 0 64 64">
      <path
        d="M24 36h26a9 9 0 0 0 0-18 11 11 0 0 0-21-4A8 8 0 0 0 24 36z"
        fill="currentColor"
      />
      <path
        d="M27 47v8M23 51h8M36 47v8M32 51h8M45 47v8M41 51h8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
  storm: (
    <svg viewBox="0 0 64 64">
      <path
        d="M24 36h26a9 9 0 0 0 0-18 11 11 0 0 0-21-4A8 8 0 0 0 24 36z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M36 38l-8 12h5l-4 12 11-15h-6l4-9z"
        fill="currentColor"
      />
    </svg>
  ),
};

export default function WeatherIcon({ icon, size = 64, color }) {
  const content = ICONS[icon] || ICONS.clear;
  return (
    <span
      className="weather-icon"
      style={{ width: size, height: size, color }}
    >
      {content}
    </span>
  );
}