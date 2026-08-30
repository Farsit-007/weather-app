import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import WeatherCard from "./components/WeatherCard";
import WeatherScene from "./components/WeatherScene";
import RecommendationCard from "./components/RecommendationCard";

/*
  The result page — RAW TEMPLATE VERSION.

  Nothing is fetched and nothing is passed down: every piece of text is written
  by hand inside the component that shows it. The colours, the gradients and the
  animations are the real ones, so the page looks finished while the data is not.

  Where the text comes from in the finished page:

    place           - what LocationModal sends through the router
    weather         - what getWeatherByCoordinates() returns in services/weatherService.js
    recommendation  - what getWeatherRecommendation() returns in utils/weatherRecommendation.js

  The colours are the "rain" theme of utils/weatherTheme.js, written out here as
  plain colour codes. Copy another theme from that file to preview it.
*/
export default function AWeather() {
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

          <button type="button" className="btn-ghost">
            <Search size={17} strokeWidth={2.5} />
            Change city
          </button>
        </header>

        {/*
          `lg:grid-cols-2` is what makes the two columns; below that width the
          browser falls back to one column and stacks them. The `order` classes
          put the animation first on a phone, where it looks best at the top.
        */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <WeatherCard />
            <RecommendationCard />
          </div>
          <div className="order-1 lg:order-2 lg:sticky lg:top-10">
            <WeatherScene />
          </div>
        </div>
      </div>
    </main>
  );
}
