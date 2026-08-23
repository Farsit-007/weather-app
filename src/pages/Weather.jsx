import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import RecommendationCard from "../components/RecommendationCard";
import { getWeatherByCoordinates } from "../services/weatherService";
import { getWeatherRecommendation } from "../utils/weatherRecommendation";

/*
  The result page.

  The chosen place is passed here by LocationModal through the router:
  navigate("/weather", { state: { location } }). We read it back with
  useLocation() and then ask the API for that location's weather.
*/
export default function Weather() {
  const { state } = useLocation();
  const location = state?.location;

  // The weather data from the API, or null while we don't have it yet.
  const [weather, setWeather] = useState(null);
  // True while the request is running, so we can show the loading message.
  const [loading, setLoading] = useState(Boolean(location));
  // "" = no error, "no_location" = user came here directly, "api" = request failed.
  const [error, setError] = useState(location ? "" : "no_location");

  useEffect(() => {
    // Someone opened /weather directly without picking a place first.
    if (!location) return;

    // If the user leaves the page before the request finishes, we must not call
    // setState any more. `cancelled` is flipped by the cleanup function below.
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
    <main className="min-h-screen flex flex-col items-center justify-start pt-11 px-6 py-16 max-sm:py-11 max-sm:px-[18px]">
      <Link
        to="/"
        className="self-start text-[14px] font-semibold text-sky-deep no-underline bg-white border border-line rounded-full px-5 py-[10px] shadow-sm-soft mb-[26px] hover:bg-sky-soft hover:border-sky-light transition-colors"
      >
        ← Back to home
      </Link>

      {/* Loading: a spinning circle and a short message. */}
      {loading && (
        <div className="panel">
          <span className="inline-block w-9 h-9 rounded-full border-4 border-sky-light border-t-sky animate-spin" />
          <p className="text-[16px] text-slate mt-4 mb-0">Getting your weather...</p>
        </div>
      )}

      {/* No location: the user opened this page without choosing a place. */}
      {!loading && error === "no_location" && (
        <div className="panel">
          <h2 className="text-[20px] font-bold mb-[10px] m-0">We don't know where you are yet</h2>
          <p className="text-[16px] text-slate mb-6 m-0">
            Pick a location on the home page to see your weather.
          </p>
          <Link to="/" className="btn-primary">
            Pick a location
          </Link>
        </div>
      )}

      {/* The request failed, or the API sent no weather data. */}
      {!loading && error === "api" && (
        <div className="panel">
          <h2 className="text-[20px] font-bold mb-[10px] m-0">
            Something went wrong while getting the weather.
          </h2>
          <p className="text-[16px] text-slate mb-6 m-0">
            Please check your internet connection and try again.
          </p>
          <Link to="/" className="btn-primary">
            Try again
          </Link>
        </div>
      )}

      {/* Everything worked: show the weather and the suggestion. */}
      {!loading && !error && weather && (
        <>
          <WeatherCard locationName={location.name} weather={weather} />
          <RecommendationCard recommendation={getWeatherRecommendation(weather)} />
        </>
      )}
    </main>
  );
}
