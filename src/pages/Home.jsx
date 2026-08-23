import { useState } from "react";
import { Zap, Lightbulb, CircleCheck, ArrowRight } from "lucide-react";
import LocationModal from "../components/LocationModal";
import WeatherLottie from "../components/WeatherLottie";

/*
  One of the three small cards under the button. Written once and reused three
  times below, so the styling lives in a single place.
*/
function Feature({ icon: Icon, title, text, delay }) {
  return (
    <div
      className={`glass flex items-center gap-3 rounded-[20px] px-[18px] py-4 shadow-sm-soft text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md-soft animate-rise ${delay}`}
    >
      <span className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[13px] bg-modal-icon text-white shadow-modal-icon flex-shrink-0">
        <Icon size={19} strokeWidth={2.25} />
      </span>
      <div className="flex flex-col">
        <span className="text-[14px] font-bold">{title}</span>
        <span className="text-[12.5px] text-slate">{text}</span>
      </div>
    </div>
  );
}

/*
  The weather animations floating in the background. Each one gets its own
  corner, its own size and its own animation delay, so they do not all move up
  and down together. `anim-float` is defined at the bottom of src/index.css.
*/
const DECORATIONS = [
  { name: "clear", position: "top-[7%] left-[5%]", size: "w-[165px] h-[165px]", delay: "[animation-delay:0s]" },
  { name: "cloudy", position: "top-[12%] right-[4%]", size: "w-[190px] h-[190px]", delay: "[animation-delay:1.4s]" },
  { name: "rain", position: "bottom-[13%] left-[2%]", size: "w-[150px] h-[150px]", delay: "[animation-delay:2.8s]" },
  { name: "snow", position: "bottom-[9%] right-[8%]", size: "w-[135px] h-[135px]", delay: "[animation-delay:4.2s]" },
];

// The landing page. Its only job is to open the location popup.
export default function Home() {
  // Controls whether the "Where are you today?" popup is visible.
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 max-sm:py-11 max-sm:px-[18px]">
      {/* Background animations. Hidden on small screens and ignored by screen readers. */}
      <div className="fixed inset-0 pointer-events-none -z-10 max-[900px]:hidden" aria-hidden="true">
        {DECORATIONS.map((item) => (
          <WeatherLottie
            key={item.name}
            kind="weather"
            name={item.name}
            className={`absolute anim-float opacity-70 ${item.position} ${item.size} ${item.delay}`}
          />
        ))}
      </div>

      {/* Two soft colour clouds right behind the title, to lift it off the page. */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <span className="absolute left-1/2 top-[22%] w-[520px] h-[520px] max-sm:w-[320px] max-sm:h-[320px] -translate-x-1/2 rounded-full bg-[#bfdbfe] opacity-40 blur-[110px]" />
        <span className="absolute left-1/2 top-[58%] w-[420px] h-[420px] max-sm:w-[260px] max-sm:h-[260px] -translate-x-1/2 rounded-full bg-[#fde68a] opacity-30 blur-[110px]" />
      </div>

      <section className="relative text-center max-w-[700px] z-10">
        <span className="glass inline-flex items-center gap-2 text-[13px] font-semibold text-sky-deep rounded-full px-[18px] py-2 mb-8 shadow-sm-soft animate-rise">
          <span className="w-[7px] h-[7px] rounded-full bg-sky animate-pulse" />
          Free weather advice, no signup
        </span>

        <h1 className="font-display font-extrabold tracking-tightish leading-[1.05] text-[clamp(62px,11vw,96px)] mb-4 m-0 animate-rise [animation-delay:80ms]">
          Sky<span className="text-gradient-hero">Wise</span>
        </h1>

        <p className="font-display font-semibold text-navy-soft text-[clamp(19px,3.4vw,27px)] mb-[14px] m-0 animate-rise [animation-delay:160ms]">
          Know the weather. Know what to carry.
        </p>

        <p className="text-[16px] leading-[1.75] text-slate max-w-[500px] mx-auto mb-9 m-0 animate-rise [animation-delay:240ms]">
          Check the weather in your city and get a simple, smart suggestion for
          your day — whether it's an umbrella, a water bottle, or warm clothes.
        </p>

        {/* btn-primary is defined in src/index.css; the extra classes make it larger. */}
        <button
          type="button"
          className="btn-primary group text-[17px] tracking-wideish px-[44px] py-[18px] animate-rise [animation-delay:320ms]"
          onClick={() => setModalOpen(true)}
        >
          Check My Weather
          <ArrowRight size={19} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
        </button>

        <div className="grid grid-cols-3 gap-[14px] mt-12 max-[640px]:grid-cols-1">
          <Feature
            icon={Zap}
            title="Instant weather"
            text="Live conditions for any city"
            delay="[animation-delay:400ms]"
          />
          <Feature
            icon={Lightbulb}
            title="Smart tips"
            text="A suggestion for your day"
            delay="[animation-delay:480ms]"
          />
          <Feature
            icon={CircleCheck}
            title="No signup"
            text="Free and always available"
            delay="[animation-delay:560ms]"
          />
        </div>
      </section>

      {/* The popup only exists in the page while modalOpen is true. */}
      {modalOpen && <LocationModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}
