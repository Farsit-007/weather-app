import { useState } from "react";
import { Zap, Lightbulb, CircleCheck } from "lucide-react";
import LocationModal from "../components/LocationModal";
import WeatherIcon from "../components/WeatherIcon";

/*
  One of the three small cards under the button. Written once and reused three
  times below, so the styling lives in a single place.
*/
function Feature({ icon: Icon, title, text }) {
  return (
    <div className="flex items-center gap-3 bg-white/85 border border-line rounded-[18px] px-[18px] py-[13px] shadow-sm-soft text-left">
      <span className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-[12px] bg-sky-soft text-sky-deep flex-shrink-0">
        <Icon size={19} strokeWidth={2.25} />
      </span>
      <div className="flex flex-col">
        <span className="text-[14px] font-bold">{title}</span>
        <span className="text-[12.5px] text-slate">{text}</span>
      </div>
    </div>
  );
}

// The landing page. Its only job is to open the location popup.
export default function Home() {
  // Controls whether the "Where are you today?" popup is visible.
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 max-sm:py-11 max-sm:px-[18px]">
      <section className="relative text-center max-w-[660px] z-10">
        {/* Decorative background icons. Hidden on phones and ignored by screen readers. */}
        <div className="fixed inset-0 pointer-events-none -z-10 max-[640px]:hidden" aria-hidden="true">
          <span className="absolute top-[9%] left-[6%] opacity-55">
            <WeatherIcon icon="clear" size={130} color="#fbbf24" />
          </span>
          <span className="absolute top-[16%] right-[5%] opacity-40">
            <WeatherIcon icon="cloudy" size={170} color="#bcd6f7" />
          </span>
          <span className="absolute bottom-[16%] left-[3%] opacity-35">
            <WeatherIcon icon="rain" size={120} color="#a5c8f5" />
          </span>
          <span className="absolute bottom-[12%] right-[10%] opacity-30">
            <WeatherIcon icon="snow" size={100} color="#bfe3fb" />
          </span>
        </div>

        <span className="inline-block text-[13px] font-semibold text-sky-deep bg-white/80 border border-[#d3e4fb] rounded-full px-[18px] py-2 mb-[30px] shadow-sm-soft">
          Free weather advice, no signup
        </span>
        <h1 className="font-display font-extrabold tracking-tightish leading-[1.05] text-[clamp(60px,11vw,92px)] mb-4 m-0">
          Sky<span className="text-gradient-hero">Wise</span>
        </h1>
        <p className="font-display font-semibold text-navy-soft text-[clamp(19px,3.4vw,26px)] mb-[14px] m-0">
          Know the weather. Know what to carry.
        </p>
        <p className="text-[16px] leading-[1.75] text-slate max-w-[500px] mx-auto mb-9 m-0">
          Check the weather in your city and get a simple, smart suggestion for
          your day — whether it's an umbrella, a water bottle, or warm clothes.
        </p>

        {/* btn-primary is defined in src/index.css; the extra classes make it larger. */}
        <button
          type="button"
          className="btn-primary text-[17px] tracking-wideish px-[44px] py-[18px]"
          onClick={() => setModalOpen(true)}
        >
          Check My Weather
        </button>

        <div className="flex justify-center gap-[14px] flex-wrap mt-10 max-[480px]:flex-col max-[480px]:items-stretch">
          <Feature icon={Zap} title="Instant weather" text="Live conditions for any city" />
          <Feature icon={Lightbulb} title="Smart tips" text="A suggestion for your day" />
          <Feature icon={CircleCheck} title="No signup" text="Free and always available" />
        </div>
      </section>

      {/* The popup only exists in the page while modalOpen is true. */}
      {modalOpen && <LocationModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}
