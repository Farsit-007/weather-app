import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCoordinatesByCity } from "../services/weatherService";

export default function LocationModal({ onClose }) {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const goToWeather = (location) => {
    navigate("/weather", { state: { location } });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        goToWeather({ name: "Your Location", lat: latitude, lon: longitude });
      },
      () => {
        setLoading(false);
        setError(
          "Location access was denied. Please search for your city instead."
        );
      },
      { timeout: 10000 }
    );
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const location = await getCoordinatesByCity(trimmed);
      if (!location) {
        setError("We couldn't find that location.");
        return;
      }
      goToWeather(location);
    } catch {
      setError("Something went wrong while getting the weather.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="modal-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        <h2 className="modal-title">Where are you today?</h2>
        <p className="modal-subtitle">
          Pick a location and we'll check the weather for you.
        </p>

        <form onSubmit={handleSearch} className="modal-form">
          <label className="modal-label" htmlFor="city-input">
            Enter city name
          </label>
          <input
            id="city-input"
            type="text"
            className="modal-input"
            placeholder="e.g. Chattogram"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Getting your weather..." : "Get Weather"}
          </button>
        </form>

        <div className="modal-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="btn btn-outline btn-block"
          onClick={handleUseMyLocation}
          disabled={loading}
        >
          {loading ? "Getting your weather..." : "Use My Location"}
        </button>

        {error && <p className="modal-error">{error}</p>}
      </div>
    </div>
  );
}