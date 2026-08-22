import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import RecommendationCard from "../components/RecommendationCard";
import { getWeatherByCoordinates } from "../services/weatherService";
import { getWeatherRecommendation } from "../utils/weatherRecommendation";

export default function Weather() {
  const { state } = useLocation();
  const location = state?.location;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(Boolean(location));
  const [error, setError] = useState(location ? "" : "no_location");

  useEffect(() => {
    if (!location) return;
    let cancelled = false;
    getWeatherByCoordinates(location.lat, location.lon)
      .then((data) => {
        if (!cancelled) setWeather(data);
      })
      .catch(() => {
        if (!cancelled) setError("api");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [location]);

  return (
    <main className="page weather-page">
      <Link to="/" className="back-link">
        ← Back to home
      </Link>

      {loading && (
        <div className="state-block">
          <p className="state-text">Getting your weather...</p>
        </div>
      )}

      {!loading && error === "no_location" && (
        <div className="state-block card">
          <h2 className="state-title">We don't know where you are yet</h2>
          <p className="state-text">
            Pick a location on the home page to see your weather.
          </p>
          <Link to="/" className="btn btn-primary">
            Pick a location
          </Link>
        </div>
      )}

      {!loading && error === "api" && (
        <div className="state-block card">
          <h2 className="state-title">Something went wrong while getting the weather.</h2>
          <Link to="/" className="btn btn-primary">
            Try again
          </Link>
        </div>
      )}

      {!loading && !error && weather && (
        <>
          <WeatherCard locationName={location.name} weather={weather} />
          <RecommendationCard
            recommendation={getWeatherRecommendation(weather)}
          />
        </>
      )}
    </main>
  );
}