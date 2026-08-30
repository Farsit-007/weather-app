import { Clock, Thermometer } from "lucide-react";
import { LottieLight } from "lottie-react";

/*
  The right column of the weather page: a coloured sky panel with the matching
  Lottie animation playing inside it.

  Raw version: nothing is passed in. The gradient, the glow and the text colours
  below are the "rain" theme of utils/weatherTheme.js written out by hand:

    sky     linear-gradient(160deg, #eef6ff 0%, #c7e0fb 55%, #a3caf7 100%)
    accent  #3b82f6                      ink      #1d4ed8
    chip    rgba(255,255,255,0.75)       inkSoft  rgba(29,78,216,0.7)

  The animation file is picked by name, so /animations/weather/rain.json is the
  rain drawing; swap the name to preview another one.
*/
export default function WeatherScene() {
  return (
    <section
      className="relative overflow-hidden w-full rounded-card shadow-lg-soft ring-1 ring-inset ring-white/40 px-7 py-8 max-[480px]:px-5 max-[480px]:py-6 animate-rise [animation-delay:80ms]"
      style={{ background: "linear-gradient(160deg, #eef6ff 0%, #c7e0fb 55%, #a3caf7 100%)" }}
    >
      {/* Two soft lights: one in the colour of the weather behind the animation,
          one white in the corner. They give the panel some depth. */}
      <span
        className="absolute left-1/2 top-[42%] w-[360px] h-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
        style={{ background: "#3b82f6", opacity: 0.24 }}
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-20 -right-16 w-64 h-64 rounded-full bg-white opacity-40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center text-center">
        <span
          className="pill self-start"
          style={{ background: "rgba(255, 255, 255, 0.75)", color: "#1d4ed8" }}
        >
          <span className="w-[7px] h-[7px] rounded-full bg-current animate-pulse" />
          Live in Chattogram
        </span>

        <LottieLight
          src="/animations/weather/rain.json"
          className="my-1 w-[270px] h-[270px] max-[480px]:w-[190px] max-[480px]:h-[190px]"
          autoplay
          loop
        />

        <h3
          className="font-display text-[32px] max-[480px]:text-[25px] font-bold leading-tight m-0"
          style={{ color: "#1d4ed8" }}
        >
          Rain
        </h3>
        <p className="text-[15px] mt-1 mb-5 m-0" style={{ color: "rgba(29, 78, 216, 0.7)" }}>
          Moderate rain
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          <span
            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-[14px] py-2"
            style={{ background: "rgba(255, 255, 255, 0.75)", color: "#1d4ed8" }}
          >
            <Thermometer size={15} strokeWidth={2.5} />
            Feels like 34°C
          </span>
          <span
            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-[14px] py-2"
            style={{ background: "rgba(255, 255, 255, 0.75)", color: "#1d4ed8" }}
          >
            <Clock size={15} strokeWidth={2.5} />
            Updated 14:32
          </span>
        </div>
      </div>
    </section>
  );
}
