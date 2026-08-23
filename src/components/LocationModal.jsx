import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, X } from "lucide-react";
import { getCoordinatesByCity } from "../services/weatherService";

/*
  The popup where the user picks a place. There are two ways to do that:

    1. Type a city name  -> the geocoding API turns it into coordinates.
    2. "Use My Location" -> the browser gives us the coordinates directly.

  Either way we end up with { name, lat, lon } and send it to the /weather page.
*/
export default function LocationModal({ onClose }) {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  // True while we are looking the city up, used to disable the buttons.
  const [loading, setLoading] = useState(false);
  // Message shown in red at the bottom. Empty string means "no error".
  const [error, setError] = useState("");

  // Go to the result page and hand the chosen place over in the router state.
  const goToWeather = (location) => {
    navigate("/weather", { state: { location } });
  };

  // Option 2: ask the browser for the device's coordinates.
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // We already have coordinates, so no city lookup is needed.
        const { latitude, longitude } = position.coords;
        goToWeather({ name: "Your Location", lat: latitude, lon: longitude });
      },
      () => {
        // The user refused, or the position could not be read.
        setLoading(false);
        setError("Location access was denied. Please search for your city instead.");
      },
      { timeout: 10000 }
    );
  };

  // Option 1: look the typed city up with the geocoding API.
  const handleSearch = async (event) => {
    event.preventDefault(); // stop the browser from reloading the page
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
        setError("We couldn't find that location. Please check the spelling.");
        return;
      }
      goToWeather(location);
    } catch {
      // The request never came back, usually because the user is offline.
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Dark background. Clicking it closes the popup.
    <div
      className="fixed inset-0 bg-[rgba(15,30,60,0.55)] flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      {/* stopPropagation keeps clicks inside the white box from closing it. */}
      <div
        className="relative w-full max-w-[450px] bg-white rounded-[28px] shadow-lg-soft px-8 py-9 pb-[30px]"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 w-[34px] h-[34px] border-none rounded-full bg-sky-soft text-navy-soft cursor-pointer hover:bg-sky-light flex items-center justify-center"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} strokeWidth={2.25} />
        </button>

        <div className="flex items-center justify-center w-[58px] h-[58px] rounded-[18px] bg-modal-icon text-white shadow-modal-icon mb-5">
          <MapPin size={26} strokeWidth={2.25} />
        </div>

        <h2 className="font-display text-[24px] font-bold mb-2 m-0">Where are you today?</h2>
        <p className="text-[14px] text-slate mb-6 m-0">
          Pick a location and we'll check the weather for you.
        </p>

        <form onSubmit={handleSearch}>
          <label className="block text-[13px] font-semibold text-navy-soft mb-2" htmlFor="city-input">
            Enter city name
          </label>
          <input
            id="city-input"
            type="text"
            className="w-full font-sans text-[15px] text-navy bg-[#f4f8fd] border-[1.5px] border-line rounded-[14px] px-4 py-[13px] mb-[14px] outline-none focus:bg-white focus:border-sky focus:shadow-focus-sky"
            placeholder="e.g. Chattogram"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Getting your weather..." : "Get Weather"}
          </button>
        </form>

        {/* Divider with the word "or" in the middle. */}
        <div className="flex items-center gap-[14px] my-5 text-slate-light text-[13px] font-semibold before:content-[''] before:flex-1 before:h-px before:bg-line after:content-[''] after:flex-1 after:h-px after:bg-line">
          <span>or</span>
        </div>

        <button type="button" className="btn-secondary w-full" onClick={handleUseMyLocation} disabled={loading}>
          {loading ? "Getting your weather..." : "Use My Location"}
        </button>

        {error && (
          <p className="text-[14px] font-medium text-danger bg-[#fef2f2] border border-[#fecaca] rounded-[12px] px-[14px] py-[11px] mt-[18px] mb-0">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
