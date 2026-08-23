import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, X } from "lucide-react";
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
    <div
      className="fixed inset-0 bg-[rgba(15,30,60,0.55)] flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[450px] bg-white rounded-[28px] shadow-lg-soft px-8 py-9 pb-[30px]"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 w-[34px] h-[34px] border-none rounded-full bg-sky-soft text-navy-soft text-[20px] leading-none cursor-pointer hover:bg-[#d9e8fb] flex items-center justify-center"
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

        <form onSubmit={handleSearch} className="modal-form">
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
          <button
            type="submit"
            className="block w-full font-sans text-[15px] font-semibold border-none rounded-full px-7 py-[13px] cursor-pointer transition-all duration-150 text-white bg-btn-primary shadow-btn-primary hover:bg-btn-primary-hover hover:shadow-btn-primary-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Getting your weather..." : "Get Weather"}
          </button>
        </form>

        <div className="flex items-center gap-[14px] my-5 text-slate-light text-[13px] font-semibold before:content-[''] before:flex-1 before:h-px before:bg-line after:content-[''] after:flex-1 after:h-px after:bg-line">
          <span>or</span>
        </div>

        <button
          type="button"
          className="block w-full font-sans text-[15px] font-semibold border-[1.5px] border-[#c8dcf8] rounded-full px-7 py-[13px] cursor-pointer transition-all duration-150 text-sky-deep bg-white hover:bg-sky-soft hover:border-sky disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleUseMyLocation}
          disabled={loading}
        >
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