import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Search, CircleAlert, MapPin } from "lucide-react";
import WeatherCard from "../components/WeatherCard";
import WeatherScene from "../components/WeatherScene";
import WeatherLottie from "../components/WeatherLottie";
import RecommendationCard from "../components/RecommendationCard";
import LocationModal from "../components/LocationModal";
import { getWeatherByCoordinates } from "../services/weatherService";
import { getWeatherRecommendation } from "../utils/weatherRecommendation";

/*
  The result page.

  The chosen place is passed here by LocationModal through the router:
  navigate("/weather", { state: { location } }). We read it back with
  useLocation() and hand it to WeatherResult below, which asks the API for that
  location's weather.

  When the weather arrives the page is shown in two columns: the numbers on the
  left, the animation of the sky on the right. On a phone the two columns simply
  sit on top of each other.
*/
function WeatherResult({ place }) {
  // The weather data from the API, or null while we don't have it yet.
  const [weather, setWeather] = useState(null);
  // True while the request is running, so we can show the loading message.
  const [loading, setLoading] = useState(Boolean(place));
  // "" = no error, "no_location" = user came here directly, "api" = request failed.
  const [error, setError] = useState(place ? "" : "no_location");
  // The location popup, opened again by the "Change city" button.
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Someone opened /weather directly without picking a place first.
    if (!place) return;

    // If the user leaves the page before the request finishes, we must not call
    // setState any more. `cancelled` is flipped by the cleanup function below.
    let cancelled = false;

    getWeatherByCoordinates(place.lat, place.lon)
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
  }, [place]);

  return (
    <main className="min-h-screen px-6 py-10 max-sm:px-[18px] max-sm:py-7">
      <div className="w-full max-w-[1080px] mx-auto">
        <header className="flex items-center justify-between gap-3 mb-7">
          <Link to="/" className="btn-ghost">
            <ArrowLeft size={17} strokeWidth={2.5} />
            Back
          </Link>

          <span className="font-display text-[19px] font-extrabold tracking-tightish max-[560px]:hidden">
            Sky<span className="text-gradient-hero">Wise</span>
          </span>

          <button type="button" className="btn-ghost" onClick={() => setModalOpen(true)}>
            <Search size={17} strokeWidth={2.5} />
            Change city
          </button>
        </header>

        {/* Loading: one of the animations, so the wait matches the rest of the page. */}
        {loading && (
          <div className="flex justify-center">
            <div className="panel animate-rise">
              <WeatherLottie kind="weather" name="cloudy" className="w-[110px] h-[110px] mx-auto" />
              <p className="text-[16px] font-semibold text-slate mt-2 mb-0">Getting your weather...</p>
            </div>
          </div>
        )}

        {/* No location: the user opened this page without choosing a place. */}
        {!loading && error === "no_location" && (
          <div className="flex justify-center">
            <div className="panel animate-rise">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-[18px] bg-modal-icon text-white shadow-modal-icon mb-4">
                <MapPin size={25} strokeWidth={2.25} />
              </span>
              <h2 className="text-[20px] font-bold mb-[10px] m-0">We don't know where you are yet</h2>
              <p className="text-[16px] text-slate mb-6 m-0">Pick a location to see your weather.</p>
              <button type="button" className="btn-primary" onClick={() => setModalOpen(true)}>
                Pick a location
              </button>
            </div>
          </div>
        )}

        {/* The request failed, or the API sent no weather data. */}
        {!loading && error === "api" && (
          <div className="flex justify-center">
            <div className="panel animate-rise">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-[18px] bg-[#fef2f2] text-danger border border-[#fecaca] mb-4">
                <CircleAlert size={25} strokeWidth={2.25} />
              </span>
              <h2 className="text-[20px] font-bold mb-[10px] m-0">
                Something went wrong while getting the weather.
              </h2>
              <p className="text-[16px] text-slate mb-6 m-0">
                Please check your internet connection and try again.
              </p>
              <button type="button" className="btn-primary" onClick={() => setModalOpen(true)}>
                Try again
              </button>
            </div>
          </div>
        )}

        {/*
          Everything worked. `lg:grid-cols-2` is what makes the two columns; below
          that width the browser falls back to one column and stacks them. The
          `order` classes put the animation first on a phone, where it looks best
          at the top.
        */}
        {!loading && !error && weather && (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <WeatherCard locationName={place.name} weather={weather} />
              <RecommendationCard recommendation={getWeatherRecommendation(weather)} />
            </div>
            <div className="order-1 lg:order-2 lg:sticky lg:top-10">
              <WeatherScene locationName={place.name} weather={weather} />
            </div>
          </div>
        )}
      </div>

      {/* The popup only exists in the page while modalOpen is true. */}
      {modalOpen && <LocationModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}

/*
  The page itself is only two lines: it reads the chosen place out of the router
  and passes it down.

  The `key` is the interesting part. React Router gives every navigation its own
  key, so when the user picks another city React builds a brand new
  WeatherResult instead of reusing the old one. That resets `weather`, `loading`
  and `error` for free — no code needed to clear them.
*/
export default function Weather() {
  const routerLocation = useLocation();

  return <WeatherResult key={routerLocation.key} place={routerLocation.state?.location} />;
}
