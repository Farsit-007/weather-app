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
    <main className="min-h-screen flex flex-col items-center justify-start pt-11 px-6 py-16 max-sm:py-11 max-sm:px-[18px]">
      <Link
        to="/"
        className="self-start text-[14px] font-semibold text-sky-deep no-underline bg-white border border-line rounded-full px-5 py-[10px] shadow-sm-soft mb-[26px] hover:bg-sky-soft hover:border-sky-light transition-colors"
      >
        ← Back to home
      </Link>

      {loading && (
        <div className="max-w-[520px] w-full text-center py-10 px-[30px]">
          <p className="text-[16px] text-slate mb-0 m-0">Getting your weather...</p>
        </div>
      )}

      {!loading && error === "no_location" && (
        <div className="max-w-[520px] w-full text-center bg-white border border-line rounded-card shadow-md-soft py-[46px] px-9">
          <h2 className="text-[20px] font-bold mb-[10px] m-0">We don't know where you are yet</h2>
          <p className="text-[16px] text-slate mb-6 m-0">
            Pick a location on the home page to see your weather.
          </p>
          <Link
            to="/"
            className="inline-block font-sans text-[15px] font-semibold border-none rounded-full px-7 py-[13px] cursor-pointer transition-all duration-150 no-underline text-white bg-btn-primary shadow-btn-primary hover:bg-btn-primary-hover hover:shadow-btn-primary-hover hover:-translate-y-0.5"
          >
            Pick a location
          </Link>
        </div>
      )}

      {!loading && error === "api" && (
        <div className="max-w-[520px] w-full text-center bg-white border border-line rounded-card shadow-md-soft py-[46px] px-9">
          <h2 className="text-[20px] font-bold mb-[10px] m-0">Something went wrong while getting the weather.</h2>
          <Link
            to="/"
            className="inline-block font-sans text-[15px] font-semibold border-none rounded-full px-7 py-[13px] cursor-pointer transition-all duration-150 no-underline text-white bg-btn-primary shadow-btn-primary hover:bg-btn-primary-hover hover:shadow-btn-primary-hover hover:-translate-y-0.5"
          >
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