import { useState } from "react";
import LocationModal from "../components/LocationModal";
import WeatherIcon from "../components/WeatherIcon";

function FeatureIcon({ name }) {
  const icons = {
    bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
    bulb: (
      <>
        <path d="M9 18h6M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m8.5 12.5 2.5 2.5 5-5" />
      </>
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

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-decor" aria-hidden="true">
          <span className="decor decor-1">
            <WeatherIcon icon="clear" size={130} color="#fbbf24" />
          </span>
          <span className="decor decor-2">
            <WeatherIcon icon="cloudy" size={170} color="#bcd6f7" />
          </span>
          <span className="decor decor-3">
            <WeatherIcon icon="rain" size={120} color="#a5c8f5" />
          </span>
          <span className="decor decor-4">
            <WeatherIcon icon="snow" size={100} color="#bfe3fb" />
          </span>
        </div>

        <span className="hero-badge">Free weather advice, no signup</span>
        <h1 className="hero-title">
          Sky<span className="hero-title-accent">Wise</span>
        </h1>
        <p className="hero-tagline">Know the weather. Know what to carry.</p>
        <p className="hero-description">
          Check the weather in your city and get a simple, smart suggestion for
          your day — whether it's an umbrella, a water bottle, or warm clothes.
        </p>

        <button
          type="button"
          className="btn btn-primary btn-large"
          onClick={() => setModalOpen(true)}
        >
          Check My Weather
        </button>

        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">
              <FeatureIcon name="bolt" />
            </span>
            <div className="feature-body">
              <span className="feature-title">Instant weather</span>
              <span className="feature-text">Live conditions for any city</span>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">
              <FeatureIcon name="bulb" />
            </span>
            <div className="feature-body">
              <span className="feature-title">Smart tips</span>
              <span className="feature-text">A suggestion for your day</span>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">
              <FeatureIcon name="check" />
            </span>
            <div className="feature-body">
              <span className="feature-title">No signup</span>
              <span className="feature-text">Free and always available</span>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && <LocationModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}
